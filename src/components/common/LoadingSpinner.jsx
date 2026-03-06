import styles from '../../styles/LoadingSpinner.module.css';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.spinnerMessage}>{message}</p>
    </div>
  );
}
