import { NavLink } from 'react-router-dom';

import styles from './Dashboard.module.css'


function Dashboard() {
  return (
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
          <button className={styles.logoutbtn}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Dashboard