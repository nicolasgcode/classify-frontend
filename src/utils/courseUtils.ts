import {
  getCourses,
  getTopics,
  getUnitsByCourse,
  deleteUnit,
} from '../services';
import { CourseData, Topic, Unit } from '../types';

export const loadCourses = async (
  setCourses: React.Dispatch<React.SetStateAction<CourseData[]>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  try {
    const data = await getCourses();
    if (Array.isArray(data)) {
      setCourses(data);
    } else {
      setError('Expected an array of courses');
    }

    console.log(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred');
    }
  } finally {
    setIsLoading(false);
  }
};

export const loadTopics = async (
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const data = await getTopics();

    if (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item === 'object' && 'id' in item && 'description' in item
      )
    ) {
      setTopics(data);
    } else {
      setError('Expected an array of topics');
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred');
    }
  }
};

export const loadUnits = async (
  courseId: number, // Recibe el courseId
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  try {
    // Pasa el courseId a la función getUnitsByCourse
    const data = await getUnitsByCourse(courseId);

    // Verificar que los datos recibidos sean una lista de unidades
    if (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item === 'object' && 'id' in item && 'description' in item
      )
    ) {
      setUnits(data);
    } else {
      setError('Expected an array of units');
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred');
    }
  } finally {
    // Asegúrate de que setIsLoading se actualice en el bloque finally
    setIsLoading(false);
  }
};

export const removeUnit = async (unitId: number): Promise<void> => {
  try {
    await deleteUnit(unitId);
  } catch (err) {
    throw new Error(
      'Error deleting unit: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};
