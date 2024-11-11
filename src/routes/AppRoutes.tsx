import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { PublicLayout, PrivateLayout, AdminLayout } from '../layouts';
import {
  LoginPage,
  HomePage,
  CoursesPage,
  UsersPage,
  SignUpPage,
  AddCoursePage,
  AddUnitPage,
  UnitsPage
} from '../pages';

import { PrivateRoutes, AdminRoutes } from '../routes'

import { useAuthStore } from '../store'



function AppRoutes() {
  const isAuth = useAuthStore(state => state.isAuth)
  const isAdmin = useAuthStore(state => state.admin)
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
          </Route>
        </Route>

         <Route element={<AdminRoutes isAllowed={isAdmin} />}>
          <Route path="/" element={<AdminLayout />}>
            <Route path="admin/courses" element={<CoursesPage />} />
            <Route path="admin/users" element={<UsersPage />} />
            <Route path="add-course" element={<AddCoursePage />} />
            <Route path="/add-units" element={<AddUnitPage />} />
            <Route path="/see-units" element={<UnitsPage />} />
          </Route>
        </Route>
    
        <Route path="*" element={ isAuth ? <Navigate to={'/home'} />: <Navigate to={'/login'} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;