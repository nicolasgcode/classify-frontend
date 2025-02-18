import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginForm } from '../components';
import { loginRequest } from '../services';
import { FormFields } from '../types';
import { loginSchema } from '../utils';
import { useAuthStore } from '../store';

export function LoginContainer() {
  const setToken = useAuthStore((state) => state.setToken);
  const setAdmin = useAuthStore((state) => state.setAdmin);
  const userId = useAuthStore((state) => state.setUserId);
  const setUserName = useAuthStore((state) => state.setUserName);

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const resLogin = await loginRequest(data);
      setToken(resLogin.data.token);
      setAdmin(resLogin.data.profile.admin);
      userId(resLogin.data.profile.id);
      setUserName(resLogin.data.profile.name);
      navigate('/home');
      console.log('Logged in!');
    } catch {
      setError('Error logging in: invalid credentials');
      console.log(data);
    }
  };

  return (
    <LoginForm
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      error={error}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}
