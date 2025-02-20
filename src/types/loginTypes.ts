import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { loginSchema } from '../utils';
import { z } from 'zod';

export type loginFormProps = {
  register: UseFormRegister<FormFields>;
  onSubmit: (e: React.BaseSyntheticEvent) => Promise<void>;
  error: string | null;
  errors: FieldErrors<FormFields>;
  isSubmitting: boolean;
};

export type FormFields = z.infer<typeof loginSchema>;

export type loginRequestData = {
  email: string;
  password: string;
};

export type loginResponse = {
  message: string;
  status: number;
  success: boolean;
  token: string;
  profile: {
    id: number;
    email: string;
    name: string;
    admin: boolean;
  };
};
