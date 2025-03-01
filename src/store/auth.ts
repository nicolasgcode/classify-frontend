import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { State, Actions } from '../types';

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      username: '',
      userId: 0,
      admin: false,
      isAuth: false,
      setUserId: (userId: number) =>
        set({
          userId,
        }),
      setIsAuth: (isAuth: boolean) =>
        set({
          isAuth,
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
          isAuth: false,
          admin: false,
        }),
    }),
    {
      name: 'auth',
    }
  )
);
