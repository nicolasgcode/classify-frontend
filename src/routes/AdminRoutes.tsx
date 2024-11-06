import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAllowed: boolean;
}



const AdminRoutes: React.FC<Props> = ({ isAllowed }) => {
  return isAllowed ? <Outlet /> : <Navigate to="/login" replace />;
};








export default AdminRoutes;