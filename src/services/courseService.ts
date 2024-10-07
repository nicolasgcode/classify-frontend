import { Course } from '../types';

export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Bad network response');
    }

    const result = await response.json();

    if (result && Array.isArray(result.data)) {
      return result.data;
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
