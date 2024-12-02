import { useAuthStore } from '../../store';
import { UserDashboard, AdminDashboard } from './..';
import styles from './Dashboard.module.css';

function Dashboard() {
  const isAuth = useAuthStore(state => state.isAuth);
  const admin = useAuthStore(state => state.admin);

  if (!isAuth) {
    return <div className={styles.welcomeMessage}>
      <span>Welcome to Classify, your course platform</span>
       <p>Please log in to continue.</p>
      </div>
  }

  return admin ? <AdminDashboard /> : <UserDashboard />;
}

export default Dashboard;
