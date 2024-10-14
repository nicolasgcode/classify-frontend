import { createContext, useContext, useState } from 'react';
import { AuthContextType, AuthProviderProps } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string; role: string } | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en el inicio de sesión');
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      setRole(data.role);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null)
    console.log('logged out')
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
