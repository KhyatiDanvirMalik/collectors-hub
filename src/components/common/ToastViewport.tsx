import { useToast } from '../../context/ToastContext';
import styles from './ToastViewport.module.css';

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.viewport} role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.variant]}`}
          role="status"
        >
          <span>{toast.message}</span>
          <button
            type="button"
            className={styles.dismiss}
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
