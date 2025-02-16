import { getUsers, getUserCourses } from '../services';
import { User, userCourses } from '../types';

export const loadUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  try {
    const data = await getUsers();
    if (Array.isArray(data)) {
      setUsers(data);
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

export const loadUserCourses = async (
  userId: number,
  setUserCourses: React.Dispatch<React.SetStateAction<userCourses | undefined>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  try {
    const userCourses = await getUserCourses(userId);
    console.log(userCourses);

    if (userCourses.courses && Array.isArray(userCourses.courses)) {
      setUserCourses(userCourses);
    } else {
      setError('Expected a valid "courses" array');
    }
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
