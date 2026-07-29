import type { Listing } from '../types';
import type { MarketplaceFilterState } from '../components/marketplace/MarketplaceFilters';

export function filterAndSortListings(
  listings: Listing[],
  filters: MarketplaceFilterState
): Listing[] {
  let result = listings;

  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter((l) => l.title.toLowerCase().includes(query));
  }

  if (filters.category !== 'all') {
    result = result.filter((l) => l.category === filters.category);
  }

  if (filters.condition !== 'all') {
    result = result.filter((l) => l.condition === filters.condition);
  }

  const sorted = [...result];
  switch (filters.sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  return sorted;
}
