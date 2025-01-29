import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SignUpFields } from '../containers/SignUpContainer.tsx';
import { User } from './userTypes.ts';

export interface SignUpFormProps {
  register: UseFormRegister<SignUpFields>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  success: string | null;
  user: User | undefined;
  handleCancelEdit: () => void;
  errors: FieldErrors<SignUpFields>;
  error: string | null;
}
