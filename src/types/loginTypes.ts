import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormFields } from '../containers/LoginContainer.tsx';

export interface loginFormProps {
  register: UseFormRegister<FormFields>;
  onSubmit: (e: React.BaseSyntheticEvent) => Promise<void>;
  error: string | null;
  errors: FieldErrors<FormFields>;
  isSubmitting: boolean;
}

export interface loginRequestData {
  email: string;
  password: string;
}

export interface loginResponse {
  message: string;
  status: number;
  success: boolean;
  token: string;
  admin: boolean;
}
