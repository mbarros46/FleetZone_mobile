import { apiConfig } from './api';

export async function register(nome: string, email: string, senha: string) {
  const r = await fetch(`${apiConfig.baseURL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json(); // { token, usuario }
}

export async function login(email: string, senha: string) {
  const r = await fetch(`${apiConfig.baseURL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}