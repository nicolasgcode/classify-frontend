import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import styles from '../Dashboard/Dashboard.module.css'
import { useAuthStore, useCartStore } from '../../store'

function UserDashboard() {

  const logout = useAuthStore(state => state.logout);

  const navigate = useNavigate();

  const { items } = useCartStore();
  
  const handleLogout = () => {
    logout();
    navigate('/login')
  };
  
  return (

    <>
    <nav className={styles.dashboard}>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/courses">Store</NavLink>
        </li>
        <li>
          <NavLink to="/account">Account</NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className={styles.logoutbtn}>Logout</button>
        </li>
        <button className={styles.cart} onClick={() => navigate('/cart')}>
          <div className={styles.itemCount}>{items.length}</div>
        </button>
      </ul>
      </nav>

    </>
  )
}

export default UserDashboard