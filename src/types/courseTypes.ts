import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import { CourseFields } from '../containers/AddCourseContainer.tsx';
import { UnitFields } from '../containers/AddUnitContainer.tsx';

export type CourseData = {
  id?: number;
  title: string;
  price: number;
  level: string;
  topics: Topic[];
  units?: Unit[];
};

export type Topic = {
  id?: number | null;
  description: string;
};

export type Unit = {
  id: number;
  title: string;
  description: string;
  content: string;
};

export type CourseFormProps = {
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
};

export type UnitFormProps = {
  register: UseFormRegister<UnitFields>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancelEdit: () => void;
  unit: Unit | null;
  success: string | null;
  error: string | null;
  isSubmitting: boolean;
  errors: FieldErrors<UnitFields>;
};

export type UnitListProps = {
  units: Unit[];
  isLoading: boolean;
  error: string | null;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  onDeleteUnit: (unitId: number) => void;
};

export type coursesResponse = {
  courses: CourseData[];
};

export type courseDetails = {
  course: CourseData;
};

export type CreateCourseResponse = {
  message: string;
  course: {
    courseCreated: CourseData;
  };
};

export type CourseListProps = {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  courses: CourseData[];
  isLoading: boolean;
  error: string;
  onDelete: (courseId: number) => void;
};

// COURSE ZUSTAND TYPES
export type CourseState = {
  courseId: number | null;
};

export type CourseActions = {
  setCourseId: (id: number | undefined) => void;
  resetCourseId: () => void;
};
