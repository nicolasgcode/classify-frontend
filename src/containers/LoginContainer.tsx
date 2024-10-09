import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { LoginForm } from '../components';

const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/courses');
      console.log("Logged in!")
    } catch {
      setError('Error en el inicio de sesión. Verifica tus credenciales.');
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit} error={error} />
  );
};

export default LoginContainer;
