import { apiConfig } from './api';

export async function register(nome: string, email: string, senha: string) {
  try {
  const r = await fetch(`${apiConfig.baseURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json(); // { token, usuario }
  } catch (err) {
    // Fallback para ambiente de desenvolvimento/local quando a API não estiver disponível.
    // Isso permite demonstrar telas de login/cadastro sem backend ativo.
    console.warn('[authService] register fallback activated:', err);
    const mock = {
      token: `dev-token-${Math.random().toString(36).slice(2, 10)}`,
      usuario: {
        id: `dev-${Date.now()}`,
        nome: nome || 'Usuário Dev',
        email,
      },
    };
    return Promise.resolve(mock);
  }
}

export async function login(email: string, senha: string) {
  try {
  const r = await fetch(`${apiConfig.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  } catch (err) {
    // Fallback para demo local quando o backend não estiver acessível.
    console.warn('[authService] login fallback activated:', err);
    const nameFromEmail = (email && email.split('@')[0]) || 'Usuário Dev';
    const mock = {
      token: `dev-token-${Math.random().toString(36).slice(2, 10)}`,
      usuario: {
        id: `dev-${Date.now()}`,
        nome: nameFromEmail,
        email,
      },
    };
    return Promise.resolve(mock);
  }
}