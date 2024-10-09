import React from 'react';
import { useForm } from '../../hooks';

const validateLoginFields = (values: { email: string; password: string }) => {
  const errors: { [key: string]: string } = {};
  if (!values.email) {
    errors.email = 'El nombre de usuario es requerido';
  }
  if (!values.password) {
    errors.password = 'La contraseña es requerida';
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
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
