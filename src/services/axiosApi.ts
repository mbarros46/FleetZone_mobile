import axios from 'axios';
import { apiConfig } from './api';

const client = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout ?? 10000,
  headers: apiConfig.headers,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
};

export default client;
