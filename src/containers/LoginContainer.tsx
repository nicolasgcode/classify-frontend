import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components';
import { loginRequest } from '../services'
import { useAuthStore } from '../store'
import { useForm } from '../hooks'

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

function LoginContainer () {
  const setToken = useAuthStore(state => state.setToken)
  const setAdmin = useAuthStore(state => state.setAdmin)
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

   const { values, handleChange, handleSubmit, errors } = useForm(
    { email: '', password: '' },
    validateLoginFields
  );

  const submitForm = async () => {
      try {
      const resLogin = await loginRequest(values.email, values.password);
      setToken(resLogin.data.token)
      setAdmin(resLogin.data.admin)
      navigate('/courses');
      console.log("Logged in!")
      console.log(resLogin)
    } catch {
      setError('Invalid credentials');
    }
  };
  


  return (
    <LoginForm values={values} onSubmit={handleSubmit(submitForm)} error={error} handleChange={handleChange} errors={errors} />
  );
};

export default LoginContainer;
