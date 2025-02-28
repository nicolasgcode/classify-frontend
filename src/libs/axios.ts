import axios from 'axios';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export default authApi;
