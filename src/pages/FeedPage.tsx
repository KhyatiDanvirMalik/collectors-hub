import { useMemo } from 'react';
import { useAsync } from '../hooks/useAsync';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { useDebounce } from '../hooks/useDebounce';
import { fetchPosts } from '../data/api';
import { FeedFilters, type FeedFilterState } from '../components/feed/FeedFilters';
import { PostCard } from '../components/feed/PostCard';
import { CardSkeletonGrid } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { filterPosts } from '../utils/feedFilters';
import styles from './PageShared.module.css';
import feedStyles from './FeedPage.module.css';

const defaultFilters: FeedFilterState = { search: '', category: 'all' };

export function FeedPage() {
  const [filters, setFilters] = useUrlFilters(defaultFilters);
  const { data: posts, isLoading, error, retry } = useAsync(fetchPosts, []);

  const debouncedSearch = useDebounce(filters.search, 300);

  const results = useMemo(() => {
    if (!posts) return [];
    return filterPosts(posts, { ...filters, search: debouncedSearch });
  }, [posts, filters, debouncedSearch]);

  const hasActiveFilters = filters.search || filters.category !== 'all';

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Community Feed</h1>
          <p className={styles.pageSubtitle}>Discover collectibles shared by fellow collectors.</p>
        </div>
      </div>

      <FeedFilters filters={filters} onChange={setFilters} />

      {isLoading && <CardSkeletonGrid count={8} />}

      {!isLoading && error && <ErrorState message={error} onRetry={retry} />}

      {!isLoading && !error && posts && results.length === 0 && (
        <EmptyState
          title={hasActiveFilters ? 'No posts match your search' : 'No posts yet'}
          description={
            hasActiveFilters
              ? 'Try a different search term or category.'
              : 'Be the first to share something from your collection.'
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
        <div className={feedStyles.feedGrid}>
          {results.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
