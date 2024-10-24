import { LoginFormProps } from '../../types'
import styles from './LoginForm.module.css'
import { NavLink } from 'react-router-dom';

function LoginForm({
  values,
  handleChange,
  onSubmit,
  errors,
  error,
}: LoginFormProps) {
 
   return (
    <div className={styles.loginform}>
      <form onSubmit={onSubmit}>
        <div className={styles.formgroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button className={styles.loginBtn}>Iniciar sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {errors.email && (
        <span className={styles.fieldError}>{errors.email}</span>
      )}
      {errors.password && (
        <span className={styles.fieldError}>{errors.password}</span>
      )}
      <p className={styles.signUpPrompt}>
        Don't have an account? 
        <NavLink to="/signup" className={styles.signUpLink}>
          Sign up
        </NavLink>
      </p>
    </div>
  );
};

export default LoginForm;
