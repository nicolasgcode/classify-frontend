import { SignUpForm } from '../components'
import { useState } from 'react';
import { createUser, updateUser } from '../services';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { UserData } from '../types';

const schema = z.object({
  dni: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpFields = z.infer<typeof schema>;

type UserFormProps = {
  user? : UserData
  handleCancelEdit?: () => void;
}

export default function SignUpContainer({ user, handleCancelEdit }: UserFormProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

 const { register, handleSubmit, formState: {errors, isSubmitting}, } = useForm<SignUpFields>({defaultValues: user ? {
    dni: user.dni,
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password
 } : undefined, 
 resolver: zodResolver(schema)});

  async function onSubmit(data: SignUpFields) {
    if (user) {
      try {
        await updateUser(user.id, data);
        setSuccess('User updated successfully!');
        setError(null);
      } catch {
        setError('Error updating user, please try again');
        setSuccess(null);
      }
    } else {
    try {
      await createUser(data);
      setSuccess('User created successfully!');
      navigate('/login')
      setError(null);
    } catch {
      setError('Error creating user, please try again');
      setSuccess(null);
    }
  }
  };

  return (
    <SignUpForm 
      user={user}
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      success={success}
      isSubmitting={isSubmitting}
      errors={errors}
      error={error}
      handleCancelEdit={handleCancelEdit}
      />
  )
}





 
