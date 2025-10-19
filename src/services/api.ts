// Configuração base para chamadas de API
// No Expo, as variáveis EXPO_PUBLIC_ são disponibilizadas automaticamente
declare const process: {
  env: {
    EXPO_PUBLIC_API_URL?: string;
  };
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.3:8080';

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

// Função helper para requisições autenticadas
export const authenticatedFetch = async (url: string, options: RequestInit = {}, token?: string) => {
  const controller = new AbortController();
  const timeout = apiConfig.timeout ?? 10000;
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(token),
        ...options.headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
};
