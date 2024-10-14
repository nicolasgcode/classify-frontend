import styles from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
