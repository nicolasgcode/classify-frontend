import { getCourses } from '../services';
import { Course } from '../types';

export const loadCourses = async (
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
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
