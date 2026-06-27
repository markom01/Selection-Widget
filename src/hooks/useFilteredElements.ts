import { useMemo } from 'react';
import type { ElementItem, FilterValue } from '../types';
import { CONSTANTS } from '../config/constants';
import { extractNumber } from '../utils/extractNumber';
import { matchSearch } from '../utils/matchSearch';
import { useDebounce } from './useDebounce';

export function useFilteredElements(
  allElements: ElementItem[],
  searchQuery: string,
  filterValue: FilterValue
): ElementItem[] {
  const debouncedQuery = useDebounce(searchQuery, CONSTANTS.DEBOUNCE_MS);

  return useMemo(() => {
    return allElements.filter((item) => {
      if (!matchSearch(item.label, debouncedQuery)) return false;

      if (filterValue !== 'all') {
        const num = extractNumber(item.label);
        if (num <= filterValue) return false;
      }

      return true;
    });
  }, [allElements, debouncedQuery, filterValue]);
}
