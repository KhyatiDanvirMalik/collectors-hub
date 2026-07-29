import type { Post } from '../types';
import type { FeedFilterState } from '../components/feed/FeedFilters';

export function filterPosts(posts: Post[], filters: FeedFilterState): Post[] {
  let result = posts;

  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter(
      (p) => p.caption.toLowerCase().includes(query) || p.userName.toLowerCase().includes(query)
    );
  }

  if (filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category);
  }

  return [...result].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
