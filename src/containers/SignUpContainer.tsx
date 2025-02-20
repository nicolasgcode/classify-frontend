import { SignUpForm } from '../components';
import { useState } from 'react';
import { createUser, updateUser } from '../services';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormProps, SignUpFields } from '../types';
import { signUpSchema } from '../utils';

export function SignUpContainer({ user, handleCancelEdit }: UserFormProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFields>({
    defaultValues: user
      ? {
          dni: user.dni,
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
        }
      : undefined,
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFields) {
    if (user) {
      if (user.id === undefined || user.id === null) {
        setError('Invalid user ID');
        return;
      }
      try {
        await updateUser(user.id, data);
        setSuccess('User updated successfully!');
        setError(null);
        window.location.reload();
      } catch {
        setError('Error updating user, please try again');
        setSuccess(null);
      }
    } else {
      try {
        await createUser(data);
        setSuccess('User created successfully!');
        navigate('/login');
        setError(null);
      } catch {
        setError('Error creating user, please try again');
        setSuccess(null);
      }
    }
  }

  return (
    <SignUpForm
      user={user}
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      success={success}
      isSubmitting={isSubmitting}
      errors={errors}
      error={error}
      handleCancelEdit={handleCancelEdit ?? (() => {})}
    />
  );
}
