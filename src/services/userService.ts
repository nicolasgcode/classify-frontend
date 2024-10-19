import axios from '../libs/axios';
import { User, usersResponse } from '../types';

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
