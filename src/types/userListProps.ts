import { User } from '.';

export interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: string;
}
