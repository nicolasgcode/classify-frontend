import axios from '../libs/axios';
import {
  CourseData,
  coursesResponse,
  courseDetails,
  Level,
  Topic,
  Unit,
  CreateCourseResponse,
} from '../types';

export const getCourses = async (): Promise<CourseData[]> => {
  try {
    const response = await axios.get<coursesResponse>('/api/courses');

    if (response.data.courses && Array.isArray(response.data.courses)) {
      return response.data.courses;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (err) {
    throw new Error(
      'Error fetching courses: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const getCourse = async (courseId: number): Promise<CourseData> => {
  try {
    const response = await axios.get<courseDetails>(`/api/courses/${courseId}`);
    console.log(response.data.course);

    return response.data.course;
  } catch (err) {
    throw new Error(
      'Error fetching course details: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const createCourse = async (course: CourseData): Promise<CourseData> => {
  try {
    // Especificamos que la respuesta de axios será de tipo CourseData
    const response = await axios.post<CreateCourseResponse>(
      '/api/courses',
      course
    );
    const createdCourse = response.data.course.courseCreated;
    console.log(response.data.course.courseCreated.id);
    return createdCourse;
  } catch (err) {
    throw new Error(
      'Error adding course: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const getTopics = async (): Promise<Topic[]> => {
  try {
    const response = await axios.get<{ data: Topic[] }>('/api/topics');
    return response.data.data;
  } catch (err) {
    throw new Error(
      'Error fetching topics: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const deleteTopic = async (topicId: number): Promise<void> => {
  try {
    await axios.delete(`/api/topics/${topicId}`);
  } catch (err) {
    throw new Error(
      'Error deleting topic: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const deleteUnit = async (unitId: number): Promise<void> => {
  try {
    await axios.delete(`/api/units/${unitId}`);
  } catch (err) {
    throw new Error(
      'Error deleting topic: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const getLevels = async (): Promise<Level[]> => {
  try {
    const response = await axios.get<{ data: Level[] }>('/api/levels');

    return response.data.data;
  } catch (err) {
    throw new Error(
      'Error fetching levels: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const getUnits = async (): Promise<Unit[]> => {
  try {
    const response = await axios.get<{ data: Unit[] }>('/api/units');

    return response.data.data;
  } catch (err) {
    throw new Error(
      'Error fetching levels: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const addUnitToLevel = async (
  courseId: number, // ID del curso al que pertenece el nivel
  levelId: number, // ID del nivel al que se agregará la unidad
  unitData: Unit // Datos de la nueva unidad
): Promise<void> => {
  try {
    // Realizamos la solicitud POST para agregar la unidad al nivel
    const response = await axios.patch(
      `/api/courses/${courseId}/levels/${levelId}/units`, // Ruta para agregar una unidad al nivel
      unitData // Datos de la nueva unidad
    );

    // Si la operación es exitosa, no se espera ninguna respuesta específica, pero se puede hacer algo si lo deseas.
    console.log('Unit added successfully:', response.data);
  } catch (err) {
    // Manejo de errores
    throw new Error(
      'Error adding unit to level: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};
