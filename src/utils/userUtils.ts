import { getUsers } from '../services';
import { User } from '../types';

export const loadUsers = async (
  setCourses: React.Dispatch<React.SetStateAction<User[]>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  try {
    const data = await getUsers();
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
