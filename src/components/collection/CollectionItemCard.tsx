import type { CollectionItem } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { SpecimenTag } from '../common/SpecimenTag';
import { CategoryBadge } from '../common/CategoryBadge';
import { formatCurrency, formatDate } from '../../utils/format';
import styles from './CollectionItemCard.module.css';

interface CollectionItemCardProps {
  item: CollectionItem;
  catalogNumber: string;
  onRemove: () => void;
  onMove: () => void;
}

export function CollectionItemCard({
  item,
  catalogNumber,
  onRemove,
  onMove,
}: CollectionItemCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <SafeImage src={item.imageUrl} alt={item.title} className={styles.image} />
        <SpecimenTag catalogNumber={catalogNumber} />
      </div>

      <div className={styles.body}>
        <CategoryBadge category={item.category} />
        <h3 className={styles.title}>{item.title}</h3>

        <div className={styles.metaRow}>
          <span>Added {formatDate(item.dateAdded)}</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.value}>{formatCurrency(item.estimatedValue)}</span>
          <div className={styles.actions}>
            <button type="button" className={styles.actionBtn} onClick={onMove}>
              Move
            </button>
            <button type="button" className={styles.removeBtn} onClick={onRemove}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
