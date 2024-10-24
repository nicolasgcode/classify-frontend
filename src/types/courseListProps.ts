import { Course } from '.';

export interface CourseListProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  courses: Course[];
  isLoading: boolean;
  error: string;
}
