import axios from '../libs/axios';
import { User, usersResponse, UserData } from '../types';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<usersResponse>('/api/users');

    if (response.data.users && Array.isArray(response.data.users)) {
      return response.data.users;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (err) {
    throw new Error(
      'Error fetching users: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  }
};

export const createUser = async (data: UserData): Promise<UserData> => {
  try {
    const response = await axios.post<UserData>('/api/users', {
      ...data,
      dni: Number(data.dni),
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error('Error creating user: ' + (err as Error).message);
  }
};

export const updateUser = async (
  id: number,
  data: UserData
): Promise<UserData> => {
  try {
    const response = await axios.patch<UserData>(`/api/users/${id}`, {
      ...data,
      dni: Number(data.dni),
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error('Error creating user: ' + (err as Error).message);
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`/api/users/${userId}`);
  } catch (error) {
    throw new Error(
      'Error deleting course: ' +
        (error instanceof Error ? error.message : 'Unknown error')
    );
  }
};
