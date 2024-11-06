export interface CourseData {
  title: string;
  price: number;
  topics: Topic[];
  levels: Level[];
}

interface Topic {
  id: number;
  description: string;
}

interface Level {
  id: number;
  name: string;
}

export interface CourseFormProps {
  values: CourseData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel?: () => void;
  success: string | null;
  error: string | null;
  errors: { [key: string]: string };
  isEditing: boolean;
}

export interface coursesResponse {
  courses: CourseData[];
}

export interface CourseListProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  courses: CourseData[];
  isLoading: boolean;
  error: string;
}
