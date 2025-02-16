import { useAuthStore } from '../../store';

import styles from './Profile.module.css';

export function Profile() {
  const username = useAuthStore((state) => state.username);

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.welcomeUser}>Welcome {username}</h1>
    </div>
  );
}
