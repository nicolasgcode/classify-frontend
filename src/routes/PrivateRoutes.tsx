import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context';

import { LoadingSpinner } from '../components'

function PrivateRoutes() {
  const { user, isLoading } = useAuth();

    if (isLoading) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;