import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import { CourseFields } from '../containers/AddCourseContainer.tsx';
import { UnitFields } from '../containers/AddUnitContainer.tsx';

export interface CourseData {
  id?: number;
  title: string;
  price: number;
  level: string;
  topics: Topic[];
  units?: Unit[];
}

export interface Topic {
  id?: number | null;
  description: string;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  content: string;
}

export interface CourseFormProps {
  register: UseFormRegister<CourseFields>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  control: Control<CourseFields>;
  handleCancel?: () => void;
  handleAddTopic: () => void;
  handleEditTopic: (topicId: number | undefined) => void;
  handleCancelEdit: () => void | undefined;
  handleDeleteTopic: (topicId: number | undefined) => void;
  course: CourseData | undefined;
  success: string | null;
  error: string | null;
  isSubmitting: boolean;
  errors: FieldErrors<CourseFields>;
  topicsList: Topic[];
}

export interface UnitFormProps {
  register: UseFormRegister<UnitFields>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancelEdit: () => void;
  unit: Unit | null;
  success: string | null;
  error: string | null;
  isSubmitting: boolean;
  errors: FieldErrors<UnitFields>;
}

export interface UnitListProps {
  units: Unit[];
  isLoading: boolean;
  error: string | null;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  onDeleteUnit: (unitId: number) => void;
}

export interface coursesResponse {
  courses: CourseData[];
}

export interface courseDetails {
  course: CourseData;
}

export interface CreateCourseResponse {
  message: string;
  course: {
    courseCreated: CourseData;
  };
}

export interface CourseListProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  courses: CourseData[];
  isLoading: boolean;
  error: string;
  onDelete: (courseId: number) => void;
}
