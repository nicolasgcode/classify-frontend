import { NavLink } from 'react-router-dom';
import { useLogout } from '../../hooks';

import styles from '../Dashboard/Dashboard.module.css';

export function AdminDashboard() {
  const { handleLogout } = useLogout();
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
