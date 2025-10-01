import { apiConfig } from '../../../services/api';

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
  };
}

export async function login(email: string, senha: string): Promise<AuthResponse> {
  const response = await fetch(`${apiConfig.baseURL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro ao fazer login');
  }
  
  return response.json();
}

export async function register(nome: string, email: string, senha: string): Promise<AuthResponse> {
  const response = await fetch(`${apiConfig.baseURL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro ao criar conta');
  }
  
  return response.json();
}
