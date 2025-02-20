import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { State, Actions } from '../types';

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: '',
      username: '',
      userId: 0,
      admin: false,
      isAuth: false,
      setToken: (token: string) =>
        set({
          token,
          isAuth: true,
        }),
      setUserId: (userId: number) =>
        set({
          userId,
        }),
      setAdmin: (admin: boolean) =>
        set({
          admin,
        }),
      setUserName: (username: string) =>
        set({
          username,
        }),
      logout: () =>
        set({
          username: '',
          token: '',
          isAuth: false,
          admin: false,
        }),
    }),
    {
      name: 'auth',
    }
  )
);
