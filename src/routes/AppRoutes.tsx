import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { PublicLayout, PrivateLayout } from '../layouts';
import {
  LoginPage,
  HomePage,
  CoursesPage
} from '../pages';

import { PrivateRoutes } from '../routes'

import { useAuth } from '../context'


function AppRoutes() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<PublicLayout />}>
         <Route
            index
            element={user ? <Navigate to="/home" /> : <LoginPage />}
          />
        
          <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />

        </Route>

        {/* Rutas privadas */}

       {/* Rutas privadas */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<PrivateLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
          </Route>
        </Route>
    
        <Route path="*" element={ user ? <Navigate to={'/home'} /> : <Navigate to={'/login'} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;