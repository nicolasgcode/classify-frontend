import { useAuthStore } from '../../store';
import { UserDashboard, AdminDashboard } from './..';

function Dashboard() {
  const isAuth = useAuthStore(state => state.isAuth);
  const admin = useAuthStore(state => state.admin);

  if (!isAuth) {
    return <div>Please log in.</div>;
  }

  return admin ? <AdminDashboard /> : <UserDashboard />;
}

export default Dashboard;
