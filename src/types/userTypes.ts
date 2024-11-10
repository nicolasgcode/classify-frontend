export interface User {
  id: number;
  dni: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  admin: boolean;
  PurchaseRecord: Array<{ id: number }>;
}

export interface UserData {
  dni: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface usersResponse {
  users: User[];
}

export interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: string;
}
