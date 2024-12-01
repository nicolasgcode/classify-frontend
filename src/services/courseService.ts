import axios from '../libs/axios';
import {
  CourseData,
  coursesResponse,
  courseDetails,
  Topic,
  Unit,
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

export const createCourse = async (data: CourseData): Promise<CourseData> => {
  try {
    const response = await axios.post<CourseData>('/api/courses', {
      ...data,
      price: Number(data.price),
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error('Error creating user: ' + (err as Error).message);
  }
};

export const updateCourse = async (
  id: number,
  data: CourseData
): Promise<CourseData> => {
  try {
    const response = await axios.patch<CourseData>(`/api/courses/${id}`, {
      ...data,
      price: Number(data.price),
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error('Error creating user: ' + (err as Error).message);
  }
};

export const deleteCourse = async (courseId: number): Promise<void> => {
  try {
    await axios.delete(`/api/courses/${courseId}`);
  } catch (error) {
    throw new Error(
      'Error deleting course: ' +
        (error instanceof Error ? error.message : 'Unknown error')
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

export const createTopic = async (data: Topic): Promise<Topic> => {
  try {
    const response = await axios.post<Topic>('/api/topics', {
      ...data,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error('Error creating user: ' + (err as Error).message);
  }
};

export const updateTopic = async (id: number, data: Topic): Promise<Topic> => {
  try {
    const response = await axios.put<Topic>(`/api/topics/${id}`, {
      ...data,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error('Error creating user: ' + (err as Error).message);
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

export const getUnitsByCourse = async (courseId: number): Promise<Unit[]> => {
  try {
    const response = await axios.get<{ data: Unit[] }>(
      `/api/courses/${courseId}/units`
    );
    return response.data.data;
  } catch (err) {
    throw new Error(
      'Error fetching units for course ' +
        courseId +
        ': ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const addUnitToCourse = async (
  courseId: number,
  unitData: Unit
): Promise<void> => {
  try {
    const response = await axios.post(
      `/api/courses/${courseId}/units`,
      unitData
    );
    console.log('Unit added successfully:', response.data);
  } catch (err) {
    throw new Error(
      'Error adding unit to level: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const updateUnit = async (id: number, data: Unit): Promise<Unit> => {
  try {
    const response = await axios.put<Unit>(`/api/units/${id}`, {
      ...data,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error('Error updating unit: ' + (err as Error).message);
  }
};
