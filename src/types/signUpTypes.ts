import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { signUpSchema } from '../utils';
import { UserData, User } from '.';

export type SignUpFormProps = {
  register: UseFormRegister<SignUpFields>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  success: string | null;
  user: UserData | User | undefined;
  handleCancelEdit: () => void;
  errors: FieldErrors<SignUpFields>;
  error: string | null;
};

export type SignUpFields = z.infer<typeof signUpSchema>;

export type UserFormProps = {
  user?: UserData;
  handleCancelEdit?: () => void;
};
