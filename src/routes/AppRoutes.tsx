import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { PublicLayout } from '../layouts';
import {
  LoginPage,
  HomePage,
  CoursesPage
} from '../pages';

function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<PublicLayout />}>
        
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />

        </Route>

        {/* Rutas privadas */}
    
        <Route path="*" element={<Navigate to={'/login'} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;