import type { CollectionType } from '../../types';
import styles from './CollectionTabs.module.css';

interface CollectionTabsProps {
  active: CollectionType;
  counts: Record<CollectionType, number>;
  onChange: (type: CollectionType) => void;
}

const tabs: { type: CollectionType; label: string }[] = [
  { type: 'owned', label: 'Owned' },
  { type: 'wishlist', label: 'Wishlist' },
  { type: 'selling', label: 'Selling' },
];

export function CollectionTabs({ active, counts, onChange }: CollectionTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Collection type">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          role="tab"
          type="button"
          aria-selected={active === tab.type}
          className={`${styles.tab} ${active === tab.type ? styles.tabActive : ''}`}
          onClick={() => onChange(tab.type)}
        >
          {tab.label}
          <span className={styles.count}>{counts[tab.type]}</span>
        </button>
      ))}
    </div>
  );
}
