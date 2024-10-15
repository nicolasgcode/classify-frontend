import { Navigate, NavLink } from 'react-router-dom';


import styles from './Dashboard.module.css'

// import {useAuthStore} from '../../store'


function Dashboard() {

  // const setToken = useAuthStore(state => state.setToken)
  // const token = useAuthStore.getState().token

  const handleLogout = () => {
    <Navigate to={"/login"}/>
  };
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
          <button onClick={handleLogout} className={styles.logoutbtn}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Dashboard