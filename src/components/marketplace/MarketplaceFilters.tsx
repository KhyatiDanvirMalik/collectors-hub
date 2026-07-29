import type { Category, Condition, SortOption } from '../../types';
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

const conditions: Condition[] = ['Mint', 'Near Mint', 'Excellent', 'Good', 'Fair', 'Poor'];

export type MarketplaceFilterState = {
  search: string;
  category: string;
  condition: string;
  sort: SortOption;
};

interface MarketplaceFiltersProps {
  filters: MarketplaceFilterState;
  onChange: (filters: MarketplaceFilterState) => void;
}

export function MarketplaceFilters({ filters, onChange }: MarketplaceFiltersProps) {
  return (
    <FilterBar>
      <SearchInput
        value={filters.search}
        onChange={(search) => onChange({ ...filters, search })}
        placeholder="Search listings…"
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
        ariaLabel="Filter by condition"
        value={filters.condition}
        onChange={(condition) => onChange({ ...filters, condition })}
        options={[
          { value: 'all', label: 'All conditions' },
          ...conditions.map((c) => ({ value: c, label: c })),
        ]}
      />
      <Select
        ariaLabel="Sort listings"
        value={filters.sort}
        onChange={(sort) => onChange({ ...filters, sort: sort as SortOption })}
        options={[
          { value: 'newest', label: 'Newest first' },
          { value: 'price-asc', label: 'Price: Low to High' },
          { value: 'price-desc', label: 'Price: High to Low' },
        ]}
      />
    </FilterBar>
  );
}
