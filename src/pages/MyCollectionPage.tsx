import { useMemo, useState } from 'react';
import type { CollectionItem, CollectionType } from '../types';
import { useCollection } from '../context/CollectionContext';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { useDebounce } from '../hooks/useDebounce';
import { CollectionTabs } from '../components/collection/CollectionTabs';
import { CollectionFilters } from '../components/collection/CollectionFilters';
import { CollectionItemCard } from '../components/collection/CollectionItemCard';
import { MoveItemModal } from '../components/collection/MoveItemModal';
import { EmptyState } from '../components/common/EmptyState';
import { filterAndSortCollectionItems, type CollectionFilterState } from '../utils/collectionFilters';
import styles from './PageShared.module.css';

const defaultFilters: CollectionFilterState = {
  search: '',
  category: 'all',
  sort: 'newest',
};

const emptyStateCopy: Record<CollectionType, { title: string; description: string }> = {
  owned: {
    title: 'No items in your Owned collection yet',
    description: 'Add items from the Marketplace to start tracking what you own.',
  },
  wishlist: {
    title: 'Your Wishlist is empty',
    description: 'Save items you\u2019re hoping to acquire from the Marketplace.',
  },
  selling: {
    title: 'Nothing listed for sale yet',
    description: 'Move items here once you\u2019re ready to sell them.',
  },
};

export function MyCollectionPage() {
  const { items, removeItem, moveItem, getByType } = useCollection();
  const [activeTab, setActiveTab] = useState<CollectionType>('owned');
  const [filters, setFilters] = useUrlFilters(defaultFilters);
  const [movingItem, setMovingItem] = useState<CollectionItem | null>(null);

  const debouncedSearch = useDebounce(filters.search, 300);

  const counts: Record<CollectionType, number> = {
    owned: getByType('owned').length,
    wishlist: getByType('wishlist').length,
    selling: getByType('selling').length,
  };

  const results = useMemo(
    () =>
      filterAndSortCollectionItems(items, activeTab, { ...filters, search: debouncedSearch }),
    [items, activeTab, filters, debouncedSearch]
  );

  const hasActiveFilters = filters.search || filters.category !== 'all';
  const tabIsEmpty = counts[activeTab] === 0;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Collection</h1>
          <p className={styles.pageSubtitle}>
            Track what you own, want, and are selling — all in one archive.
          </p>
        </div>
      </div>

      <CollectionTabs active={activeTab} counts={counts} onChange={setActiveTab} />

      {!tabIsEmpty && <CollectionFilters filters={filters} onChange={setFilters} />}

      {results.length === 0 && (
        <EmptyState
          title={
            tabIsEmpty
              ? emptyStateCopy[activeTab].title
              : 'No items match your search'
          }
          description={
            tabIsEmpty
              ? emptyStateCopy[activeTab].description
              : 'Try adjusting your filters or searching a different term.'
          }
          action={
            !tabIsEmpty && hasActiveFilters ? (
              <button
                type="button"
                onClick={() => setFilters(defaultFilters)}
                className={styles.resetLink}
              >
                Clear all filters
              </button>
            ) : undefined
          }
        />
      )}

      {results.length > 0 && (
        <div className={styles.grid}>
          {results.map((item, index) => (
            <CollectionItemCard
              key={item.id}
              item={item}
              catalogNumber={String(index + 1).padStart(4, '0')}
              onRemove={() => removeItem(item.id)}
              onMove={() => setMovingItem(item)}
            />
          ))}
        </div>
      )}

      {movingItem && (
        <MoveItemModal
          item={movingItem}
          onClose={() => setMovingItem(null)}
          onMove={(toCollection) => moveItem(movingItem.id, toCollection)}
        />
      )}
    </div>
  );
}
