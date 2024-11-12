import { loginFormProps } from '../../types'
import styles from './LoginForm.module.css'
import { NavLink } from 'react-router-dom';

function LoginForm<FormFields>({
  register,
  onSubmit,
  error,
  errors,
  isSubmitting
}: loginFormProps<FormFields>) {
 
   return (
    <div className={styles.loginform}>
      <form onSubmit={onSubmit}>
        <div className={styles.formgroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type='email'
            {...register("email")}
          />
        </div>
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        <div className={styles.formgroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password")}
          />
    
        </div>
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        <button className={styles.loginBtn} type='submit' disabled={isSubmitting}> {isSubmitting ? "Loading..." : "Log in"}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
