import axios from '../libs/axios.ts';
import { loginResponse } from '../types';

export const loginRequest = async (email: string, password: string) => {
  return await axios.post<loginResponse>('/login', {
    email,
    password,
  });
};
