import { getCourses, getLevels, getTopics } from '../services';
import { CourseData, Level, Topic } from '../types';

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

export const loadLevels = async (
  setLevels: React.Dispatch<React.SetStateAction<Level[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const data = await getLevels();
    if (
      Array.isArray(data) &&
      data.every(
        (item) => typeof item === 'object' && 'id' in item && 'name' in item
      )
    ) {
      setLevels(data);
    } else {
      setError('Expected an array of levels');
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred');
    }
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
