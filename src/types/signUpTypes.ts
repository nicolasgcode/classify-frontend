import { UserData } from './userTypes';

export interface SignUpFormProps {
  values: UserData;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  success: string | null;
  errors: { [key: string]: string };
  error: string | null;
}
