import axios from '../libs/axios.ts';
import { loginResponse, loginRequestData } from '../types';

export const loginRequest = async (data: loginRequestData) => {
  return await axios.post<loginResponse>('/api/auth/login', {
    email: data.email,
    password: data.password,
  });
};

export const logoutRequest = async () => {
  console.log('trying to log out');
  try {
    return await axios.post('/api/auth/logout');
  } catch (error) {
    console.error('Logout failed:', error);
    console.log('Logout failed');
    throw new Error('Logout failed');
  }
};
