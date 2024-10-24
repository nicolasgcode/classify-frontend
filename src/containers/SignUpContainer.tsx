import { SignUpForm } from '../components'
import { useState } from 'react';
import { useForm } from '../hooks';
import { createUser } from '../services';
import { UserData } from '../types';

const validateSignUpFields = (values: { dni: number; name: string; surname: string; email: string; password: string }) => {
  const errors: { [key: string]: string } = {};

  if (!values.dni) {
    errors.dni = 'DNI is required';
  }

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.surname) {
    errors.surname = 'Surname is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

function SignUpContainer() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { values, handleChange, handleSubmit, reset, errors } = useForm<UserData>(
    {
      dni: 0,
      name: '',
      surname: '',
      email: '',
      password: ''
    },
    validateSignUpFields
  );

  const userData = { ...values, dni: Number(values.dni)}

  const submitForm = async () => {
    try {
      await createUser(userData);
      setSuccess('User created successfully!');
      setError(null);
      reset();
    } catch (err) {
      setError('Error creating user: ' + (err as Error).message);
      setSuccess(null);
    }
  };

  return (
    <SignUpForm 
      values={values}
      handleChange={handleChange}
      onSubmit={handleSubmit(submitForm)}
      success={success}
      errors={errors}
      error={error}
      />
      // isEditing={false}/>
  )
}


export default SignUpContainer;




 
