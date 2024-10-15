import axios from 'axios';

import { useAuthStore } from '../store';

const authApi = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default authApi;
