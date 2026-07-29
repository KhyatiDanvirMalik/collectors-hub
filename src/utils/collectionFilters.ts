import type { CollectionItem, CollectionType } from '../types';

export type CollectionFilterState = {
  search: string;
  category: string;
  sort: 'newest' | 'oldest' | 'value-asc' | 'value-desc' | 'name-asc';
};

export function filterAndSortCollectionItems(
  items: CollectionItem[],
  type: CollectionType,
  filters: CollectionFilterState
): CollectionItem[] {
  let result = items.filter((i) => i.collectionType === type);

  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter((i) => i.title.toLowerCase().includes(query));
  }

  if (filters.category !== 'all') {
    result = result.filter((i) => i.category === filters.category);
  }

  const sorted = [...result];
  switch (filters.sort) {
    case 'oldest':
      sorted.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      break;
    case 'value-asc':
      sorted.sort((a, b) => a.estimatedValue - b.estimatedValue);
      break;
    case 'value-desc':
      sorted.sort((a, b) => b.estimatedValue - a.estimatedValue);
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'newest':
    default:
      sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      break;
  }

  return sorted;
}
