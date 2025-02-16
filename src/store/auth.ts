import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  token: string;
  userId: number;
  admin: boolean;
  isAuth: boolean;
  username: string;
};

type Actions = {
  setToken: (token: string) => void;
  setAdmin: (admin: boolean) => void;
  setUserName: (username: string) => void;
  setUserId: (userId: number) => void;
  logout: () => void;
};

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
