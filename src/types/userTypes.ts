import { CourseData } from './';

export type User = {
  id: number;
  dni: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  admin?: boolean;
  coursePurchaseRecords?: Array<{
    id: number;
    purchaseAt: Date;
    courses: Array<{ title: string }>;
  }>;
};

export type UserData = {
  id?: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type usersResponse = {
  users: User[];
};

export type userCourses = {
  courses: CourseData[];
};

export type UserListProps = {
  users: User[];
  isLoading: boolean;
  error: string;
  onDelete: (userId: number) => void;
  onEdit: (user: User) => void;
};
