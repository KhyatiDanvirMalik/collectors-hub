import type { Category } from '../../types';
import styles from './CategoryBadge.module.css';

export function CategoryBadge({ category }: { category: Category }) {
  return <span className={styles.badge}>{category}</span>;
}
