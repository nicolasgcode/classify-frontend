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
  CoursesPage,
  UsersPage,
  SignUpPage
} from '../pages';

import { PrivateRoutes } from '../routes'

import { useAuthStore } from '../store'



function AppRoutes() {
  const isAuth = useAuthStore(state => state.isAuth)
  return (
    <Router>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<PublicLayout />}>

          <Route
            index
            element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
          />

          <Route path="/login" element={isAuth ? <HomePage /> : <LoginPage />} />
          <Route path="/signup" element={ <SignUpPage />} />


        </Route>


       {/* Rutas privadas */}
        <Route element={<PrivateRoutes isAllowed={isAuth} />}>
          <Route path="/" element={<PrivateLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="admin/courses" element={<CoursesPage />} />
            <Route path="admin/users" element={<UsersPage />} />
          </Route>
        </Route>
    
        <Route path="*" element={ isAuth ? <Navigate to={'/home'} />: <Navigate to={'/login'} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;