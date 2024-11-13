import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { SignUpFields } from '../containers/SignUpContainer.tsx';

export interface SignUpFormProps {
  register: UseFormRegister<SignUpFields>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  success: string | null;
  errors: FieldErrors<SignUpFields>;
  error: string | null;
}
