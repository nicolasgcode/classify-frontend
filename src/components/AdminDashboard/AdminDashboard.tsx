import { NavLink } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import styles from '../Dashboard/Dashboard.module.css';

import { useAuthStore } from '../../store';

export function AdminDashboard() {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className={styles.dashboard}>
      <ul>
        {/* <li>
          <NavLink to="/admin/reports">Reports</NavLink>
        </li> */}
        <li>
          <NavLink to="/courses">Manage Courses</NavLink>
        </li>
        <li>
          <NavLink to="/users">Manage Users</NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className={styles.logoutbtn}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
