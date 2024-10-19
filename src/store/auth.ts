import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  token: string;
  admin: boolean;
  isAuth: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setAdmin: (admin: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: '',
      admin: false,
      isAuth: false,
      setToken: (token: string) =>
        set({
          token,
          isAuth: true,
        }),
      setAdmin: (admin: boolean) =>
        set({
          admin,
        }),
      logout: () =>
        set({
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
