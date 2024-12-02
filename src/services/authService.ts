import axios from '../libs/axios.ts';
import { loginResponse, loginRequestData } from '../types';

export const loginRequest = async (data: loginRequestData) => {
  return await axios.post<loginResponse>('/login', {
    email: data.email,
    password: data.password,
  });
};
