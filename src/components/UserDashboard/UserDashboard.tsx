import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Importar useState para gestionar el estado
import styles from '../Dashboard/Dashboard.module.css';
import { useAuthStore, useCartStore } from '../../store';

function UserDashboard() {
  const [isAccountOpen, setIsAccountOpen] = useState(false); // Estado para controlar el despliegue de opciones en "Account"
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { items } = useCartStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleAccountMenu = () => {
    setIsAccountOpen(!isAccountOpen); // Cambiar el estado para mostrar u ocultar el menú
  };

  return (
    <>
      <nav className={styles.dashboard}>
        <ul>
          {/* Cuando el menú de cuenta está cerrado */}
          {!isAccountOpen ? (
            <>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/store">Store</NavLink>
              </li>
              <li>
                <button
                  onClick={toggleAccountMenu}
                  className={styles.accountbtn}
                >
                  Account
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutbtn}>
                  Logout
                </button>
              </li>

              <button className={styles.cart} onClick={() => navigate('/cart')}>
                <div className={styles.itemCount}>{items.length}</div>
              </button>
            </>
          ) : (
            <li className={styles.accountMenu}>
              <button onClick={toggleAccountMenu} className={styles.backBtn}>
                &lt;
              </button>
              <ul className={styles.accountOptions}>
                <li>
                  <NavLink to="account/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="account/mycourses">My Courses</NavLink>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default UserDashboard;
