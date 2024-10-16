import { NavLink } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'


import styles from './Dashboard.module.css'


import { useAuthStore } from '../../store'


function Dashboard() {

  const logout = useAuthStore(state => state.logout)
  const role = useAuthStore(state => state.role)

  const navigate = useNavigate()


  const handleLogout = () => {
    logout();
    navigate('/login')
  };
  return (
    role == "member" &&
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