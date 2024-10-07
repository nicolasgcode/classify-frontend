import { Course } from '.';

export interface CourseListProps {
  courses: Course[];
  isLoading: boolean;
  error: string;
}
