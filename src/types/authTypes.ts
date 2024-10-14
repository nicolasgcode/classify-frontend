export interface AuthContextType {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  role: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
