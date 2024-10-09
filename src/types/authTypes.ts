export interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
