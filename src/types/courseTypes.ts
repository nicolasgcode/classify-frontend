export interface CourseData {
  id?: number;
  title: string;
  price: number;
  topics: Topic[];
  levelIds: Level[];
}

export interface Topic {
  id: number;
  description: string;
}

export interface Level {
  id: number;
  name: string;
}

export interface Unit {
  title: string;
  description: string;
  content: string;
}

export interface CourseFormProps {
  values: CourseData;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel?: () => void;
  handleAddTopic: () => void;
  handleEditTopic: (topicId: number) => void;
  success: string | null;
  error: string | null;
  errors: { [key: string]: string };
  isEditing?: boolean;
  topicsList: Topic[];
  levelsList: Level[];
}

export interface UnitFormProps {
  unitData: Unit; // Datos de la unidad
  setUnitData: React.Dispatch<React.SetStateAction<Unit>>; // Función para cambiar los datos de la unidad
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; // Función para manejar el submit del formulario
  success: string | null; // Mensaje de éxito
  error: string | null; // Mensaje de error
  errors: { [key: string]: string }; // Errores de validación por campo
  levelIds: Level[]; // Niveles disponibles para seleccionar
  selectedLevelId: number | null; // ID del nivel seleccionado
  setSelectedLevelId: React.Dispatch<React.SetStateAction<number | null>>; // Función para cambiar el nivel seleccionado
  courseId: number; // ID del curso
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
}
