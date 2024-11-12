import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components';
import { loginRequest } from '../services'
import { useAuthStore } from '../store'
import { useForm, SubmitHandler } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type FormFields = z.infer<typeof schema>;

function LoginContainer () {
  const setToken = useAuthStore(state => state.setToken)
  const setAdmin = useAuthStore(state => state.setAdmin)
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: {errors, isSubmitting}, } = useForm<FormFields>({resolver: zodResolver(schema)});

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
      try {
      const resLogin = await loginRequest(data);
      setToken(resLogin.data.token)
      setAdmin(resLogin.data.admin)
      navigate('/home');
      console.log("Logged in!")
      console.log(resLogin)
    } catch {
      setError('Error logging in: invalid credentials' );
      console.log(data)
    }
  };
  
  return (
    <LoginForm register={register} onSubmit={handleSubmit(onSubmit)} error={error}  errors={errors} isSubmitting={isSubmitting} />
  );
};

export default LoginContainer;
