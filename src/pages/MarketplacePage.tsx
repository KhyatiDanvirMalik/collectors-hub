import { useMemo } from 'react';
import { useAsync } from '../hooks/useAsync';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { useDebounce } from '../hooks/useDebounce';
import { fetchListings } from '../data/api';
import { MarketplaceFilters, type MarketplaceFilterState } from '../components/marketplace/MarketplaceFilters';
import { ListingCard } from '../components/marketplace/ListingCard';
import { CardSkeletonGrid } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { filterAndSortListings } from '../utils/marketplaceFilters';
import styles from './PageShared.module.css';

const defaultFilters: MarketplaceFilterState = {
  search: '',
  category: 'all',
  condition: 'all',
  sort: 'newest',
};

export function MarketplacePage() {
  const [filters, setFilters] = useUrlFilters(defaultFilters);
  const { data: listings, isLoading, error, retry } = useAsync(fetchListings, []);

  const debouncedSearch = useDebounce(filters.search, 300);

  const results = useMemo(() => {
    if (!listings) return [];
    return filterAndSortListings(listings, { ...filters, search: debouncedSearch });
  }, [listings, filters, debouncedSearch]);

  const hasActiveFilters =
    filters.search || filters.category !== 'all' || filters.condition !== 'all';

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Marketplace</h1>
          <p className={styles.pageSubtitle}>Browse collectible items from sellers worldwide.</p>
        </div>
      </div>

      <MarketplaceFilters filters={filters} onChange={setFilters} />

      {isLoading && <CardSkeletonGrid count={8} />}

      {!isLoading && error && <ErrorState message={error} onRetry={retry} />}

      {!isLoading && !error && listings && results.length === 0 && (
        <EmptyState
          title={hasActiveFilters ? 'No listings match your search' : 'No listings available'}
          description={
            hasActiveFilters
              ? 'Try adjusting your filters or searching a different term.'
              : 'Check back soon — new items are added regularly.'
          }
          action={
            hasActiveFilters ? (
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

      {!isLoading && !error && results.length > 0 && (
        <div className={styles.grid}>
          {results.map((listing, index) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              catalogNumber={String(index + 1).padStart(4, '0')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
