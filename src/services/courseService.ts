import axios from '../libs/axios';
import { CourseData, coursesResponse } from '../types';

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

export const createCourse = async (course: CourseData): Promise<void> => {
  try {
    await axios.post('/api/courses', course);
  } catch (err) {
    throw new Error(
      'Error adding course: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};
