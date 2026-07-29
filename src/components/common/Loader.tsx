import styles from './Loader.module.css';

interface LoaderProps {
  label?: string;
}

export function Loader({ label = 'Loading' }: LoaderProps) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}…</span>
    </div>
  );
}

interface CardSkeletonProps {
  count?: number;
}

export function CardSkeletonGrid({ count = 8 }: CardSkeletonProps) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonLine} style={{ width: '70%' }} />
          <div className={styles.skeletonLine} style={{ width: '45%' }} />
          <div className={styles.skeletonLine} style={{ width: '30%' }} />
        </div>
      ))}
    </div>
  );
}
