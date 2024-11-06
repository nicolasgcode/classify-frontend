export interface LoginFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: { email: string; password: string };
  errors: { [key: string]: string };
}

export interface loginResponse {
  message: string;
  status: number;
  success: boolean;
  token: string;
  admin: boolean;
}
