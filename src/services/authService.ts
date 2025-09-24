import { apiConfig, getAuthHeaders } from './api';

export async function login(email: string, senha: string) {
  const res = await fetch(`${apiConfig.baseURL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { token, usuario }
}

export async function register(nome: string, email: string, senha: string) {
  const res = await fetch(`${apiConfig.baseURL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}