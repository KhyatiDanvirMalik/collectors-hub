import type { Category } from '../../types';
import type { CollectionFilterState } from '../../utils/collectionFilters';
import { SearchInput } from '../common/SearchInput';
import { Select } from '../common/Select';
import { FilterBar } from '../common/FilterBar';

const categories: Category[] = [
  'Coins',
  'Stamps',
  'Trading Cards',
  'Comics',
  'Vintage Toys',
  'Watches',
  'Vinyl Records',
  'Sports Memorabilia',
  'Art & Prints',
  'Antiques',
];

interface CollectionFiltersProps {
  filters: CollectionFilterState;
  onChange: (filters: CollectionFilterState) => void;
}

export function CollectionFilters({ filters, onChange }: CollectionFiltersProps) {
  return (
    <FilterBar>
      <SearchInput
        value={filters.search}
        onChange={(search) => onChange({ ...filters, search })}
        placeholder="Search your items…"
      />
      <Select
        ariaLabel="Filter by category"
        value={filters.category}
        onChange={(category) => onChange({ ...filters, category })}
        options={[
          { value: 'all', label: 'All categories' },
          ...categories.map((c) => ({ value: c, label: c })),
        ]}
      />
      <Select
        ariaLabel="Sort items"
        value={filters.sort}
        onChange={(sort) => onChange({ ...filters, sort: sort as CollectionFilterState['sort'] })}
        options={[
          { value: 'newest', label: 'Recently added' },
          { value: 'oldest', label: 'Oldest first' },
          { value: 'name-asc', label: 'Name A–Z' },
          { value: 'value-desc', label: 'Value: High to Low' },
          { value: 'value-asc', label: 'Value: Low to High' },
        ]}
      />
    </FilterBar>
  );
}
