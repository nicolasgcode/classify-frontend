import { CourseData } from './';

export type User = {
  id: number;
  dni: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  admin?: boolean;
  orders?: Array<{
    id: number;
    orderDate: Date;
    status: string;
    orderLines: Array<{
      id: number;
      subtotal: number;
      course: CourseData;
    }>;
  }>;
};

export type UserData = {
  id?: number;
  dni: number;
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
  onEdit: (user: UserData) => void;
};
