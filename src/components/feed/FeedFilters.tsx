import type { Category } from '../../types';
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

export type FeedFilterState = {
  search: string;
  category: string;
};

interface FeedFiltersProps {
  filters: FeedFilterState;
  onChange: (filters: FeedFilterState) => void;
}

export function FeedFilters({ filters, onChange }: FeedFiltersProps) {
  return (
    <FilterBar>
      <SearchInput
        value={filters.search}
        onChange={(search) => onChange({ ...filters, search })}
        placeholder="Search posts…"
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
    </FilterBar>
  );
}
