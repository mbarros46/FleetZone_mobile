const axios = require('axios');

const BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8085';

async function run() {
  console.log('CRUD test base URL:', BASE);
  console.log('Attempting to obtain auth (token or session cookie)');
  let cookieHeader = null;
  if (!process.env.EXPO_PUBLIC_API_TOKEN) {
    try {
      // Try form login to obtain session cookie (for servers using form-based auth)
      const form = new URLSearchParams({ username: 'test@example.com', email: 'test@example.com', senha: '123456' }).toString();
      const loginResp = await axios.post(`${BASE}/login`, form, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 5000, maxRedirects: 0 });
      // If it returns 2xx with cookies
      const setCookie = loginResp.headers && (loginResp.headers['set-cookie'] || loginResp.headers['Set-Cookie']);
      if (setCookie) {
        // join cookie parts
        cookieHeader = Array.isArray(setCookie) ? setCookie.map((c) => c.split(';')[0]).join('; ') : String(setCookie).split(';')[0];
        console.log('Obtained session cookie from /login');
      }
    } catch (err) {
      // If server responded with redirect, headers might be in err.response
      const resp = err.response;
      if (resp && resp.headers) {
        const setCookie = resp.headers['set-cookie'] || resp.headers['Set-Cookie'];
        if (setCookie) {
          cookieHeader = Array.isArray(setCookie) ? setCookie.map((c) => c.split(';')[0]).join('; ') : String(setCookie).split(';')[0];
          console.log('Obtained session cookie from redirect response');
        } else {
          console.warn('Login redirected; no set-cookie found in response headers. Location:', resp.headers.location || resp.headers.Location);
        }
      } else {
        console.warn('Form login attempt failed:', err.message || err);
      }
    }
  }

  // 1) Create
  const payload = { modelo: 'Teste CI', placa: 'TST-0001', status: 'Disponível' };
  let created;
  try {
    const headers = {};
    if (process.env.EXPO_PUBLIC_API_TOKEN) headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`;
    if (!headers.Authorization && cookieHeader) headers.Cookie = cookieHeader;
    const r = await axios.post(`${BASE}/motos`, payload, { timeout: 5000, headers, maxRedirects: 0 });
    console.log('Create status:', r.status);
    created = r.data;
    console.log('Created:', created);
  } catch (err) {
    const resp = err.response;
    if (resp) {
      console.error('Create failed, status:', resp.status, 'headers:', resp.headers);
    } else {
      console.error('Create failed:', err.message || err);
    }
    return process.exitCode = 1;
  }

  const id = created?.id ?? created?.ID ?? created?.codigo ?? null;
  if (!id) {
    console.warn('Could not determine created id from response, attempt to fetch by plate');
    try {
      const list = await axios.get(`${BASE}/motos`, { timeout: 5000 });
      const found = list.data.find((m) => (m.placa || '').toLowerCase() === payload.placa.toLowerCase());
      if (found) {
        console.log('Found created by plate, id=', found.id);
        created = found;
      } else {
        console.error('Created moto not found in list');
        return process.exitCode = 1;
      }
    } catch (err) {
      console.error('List failed:', err.message || err);
      return process.exitCode = 1;
    }
  }

  const realId = created.id ?? created.ID ?? created.codigo;

  // 2) Get
  try {
    const r = await axios.get(`${BASE}/motos/${realId}`, { timeout: 5000 });
    console.log('Get status:', r.status, 'data:', r.data);
  } catch (err) {
    console.error('Get failed:', err.message || err);
    return process.exitCode = 1;
  }

  // 3) Update
  try {
    const r = await axios.put(`${BASE}/motos/${realId}`, { modelo: 'Teste CI Atualizado', placa: payload.placa, status: 'Em manutenção' }, { timeout: 5000 });
    console.log('Update status:', r.status, 'data:', r.data);
  } catch (err) {
    console.error('Update failed:', err.message || err);
    return process.exitCode = 1;
  }

  // 4) Delete
  try {
    const r = await axios.delete(`${BASE}/motos/${realId}`, { timeout: 5000 });
    console.log('Delete status:', r.status);
  } catch (err) {
    console.error('Delete failed:', err.message || err);
    return process.exitCode = 1;
  }

  console.log('CRUD test finished successfully');
}

run().catch((e) => {
  console.error('Unexpected error', e);
  process.exitCode = 1;
});
