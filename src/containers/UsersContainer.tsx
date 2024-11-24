import { useEffect, useState } from 'react';
import { loadUsers } from '../utils';
import { User } from '../types';
import { UserList } from '../components';
import { SignUpContainer } from '../containers';
import { deleteUser } from '../services';	

export default function UsersContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers(setUsers, setError, setIsLoading);
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
    loadUsers(setUsers, setError, setIsLoading); 
  };

   const handleDelete = async (userId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteUser(userId);
      updateList(userId); 
    } catch (err) {
      setError('Error deleting course: ' + (err as Error).message);
    }
  }

  const updateList = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }

  return (
    <div>
      {selectedUser ? (
        <SignUpContainer user={selectedUser} handleCancelEdit={handleCancelEdit}/>
      ) : (
        <UserList users={users} isLoading={isLoading} error={error} onEdit={handleEdit} onDelete={handleDelete}/>
      )}
    </div>
  );
}

