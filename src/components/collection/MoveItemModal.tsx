import type { CollectionItem, CollectionType } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import styles from './MoveItemModal.module.css';

interface MoveItemModalProps {
  item: CollectionItem;
  onClose: () => void;
  onMove: (toCollection: CollectionType) => void;
}

const collectionOptions: { type: CollectionType; label: string; description: string }[] = [
  { type: 'owned', label: 'Owned', description: 'Items you currently hold in your collection.' },
  { type: 'wishlist', label: 'Wishlist', description: 'Items you\u2019re hoping to acquire.' },
  { type: 'selling', label: 'Selling', description: 'Items you\u2019re listing for sale.' },
];

export function MoveItemModal({ item, onClose, onMove }: MoveItemModalProps) {
  return (
    <Modal title={`Move "${item.title}"`} onClose={onClose}>
      <div className={styles.options}>
        {collectionOptions
          .filter((opt) => opt.type !== item.collectionType)
          .map((opt) => (
            <button
              key={opt.type}
              type="button"
              className={styles.option}
              onClick={() => {
                onMove(opt.type);
                onClose();
              }}
            >
              <span className={styles.optionLabel}>{opt.label}</span>
              <span className={styles.optionDescription}>{opt.description}</span>
            </button>
          ))}
      </div>
      <div className={styles.footer}>
        <Button variant="ghost" onClick={onClose} fullWidth>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
