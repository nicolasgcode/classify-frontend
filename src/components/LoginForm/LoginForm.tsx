import React from 'react';
import { useForm } from '../../hooks';

import styles from './LoginForm.module.css'

const validateLoginFields = (values: { email: string; password: string }) => {
  const errors: { [key: string]: string } = {};
  if (!values.email) {
    errors.email = 'Email is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

const LoginForm: React.FC<{ onSubmit: (email: string, password: string) => Promise<void>; error: string }> = ({ onSubmit, error }) => {
  const { values, handleChange, handleSubmit, errors } = useForm(
    { email: '', password: '' },
    validateLoginFields
  );

  const submitForm = async () => {
    await onSubmit(values.email, values.password);
  };

   return (
    <div className={styles.loginform}>
      <form onSubmit={handleSubmit(submitForm)}>
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
    </div>
  );
};

export default LoginForm;
