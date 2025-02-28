export type AuthContextType = {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  role: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

// AUTH ZUSTAND TYPES

export type State = {
  userId: number;
  admin: boolean;
  isAuth: boolean;
  username: string;
};

export type Actions = {
  setIsAuth: (isAuth: boolean) => void;
  setAdmin: (admin: boolean) => void;
  setUserName: (username: string) => void;
  setUserId: (userId: number) => void;
  logout: () => void;
};
