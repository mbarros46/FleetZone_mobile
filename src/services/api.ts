// Configuração base para chamadas de API
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Tipos para as entidades da API
export interface Moto {
  id: string;
  modelo: string;
  placa: string;
  status: 'Disponível' | 'Em manutenção' | 'Indisponível';
  dataEntrada: string;
  patio: string;
  km: number;
  manutencao: string;
}

export interface Usuario {
  id: string;
  email: string;
  nome: string;
}

// Headers com autenticação
export const getAuthHeaders = (token?: string) => ({
  ...apiConfig.headers,
  ...(token && { Authorization: `Bearer ${token}` }),
});
