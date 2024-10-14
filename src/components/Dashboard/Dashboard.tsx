import { Navigate, NavLink } from 'react-router-dom';

import { useAuth } from '../../context'

import styles from './Dashboard.module.css'


function Dashboard() {
   const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    <Navigate to={"/login"}/>
  };
  return (
    user &&
    <nav className={styles.dashboard}>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/courses">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/account">Account</NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className={styles.logoutbtn}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Dashboard