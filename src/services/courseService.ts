import axios from '../libs/axios';
import { Course, coursesResponse } from '../types';

export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get<coursesResponse>('/api/courses');

    console.log(response);

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
