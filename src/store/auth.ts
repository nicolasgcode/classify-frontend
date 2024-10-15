import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  token: string;
  role: string;
  isAuth: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setRole: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: '',
      role: '',
      isAuth: false,
      setToken: (token: string) =>
        set({
          token,
          isAuth: true,
        }),
      setRole: (role: string) =>
        set({
          role,
        }),
      logout: () =>
        set({
          token: '',
          isAuth: false,
        }),
    }),
    {
      name: 'auth',
    }
  )
);
