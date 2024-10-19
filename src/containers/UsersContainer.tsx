import { useEffect, useState } from 'react'
import { loadUsers } from '../utils'
import { User } from '../types'
import { UserList }  from '../components'


const UsersContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadUsers(setUsers, setError, setIsLoading);
  }, []);

  return (
    <UserList users = {users} isLoading = {isLoading} error={error}/>
  )
}


export default UsersContainer;