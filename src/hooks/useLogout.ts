import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { logoutRequest } from '../services';

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutRequest();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { handleLogout };
}
