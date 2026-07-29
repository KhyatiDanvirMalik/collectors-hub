import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

/**
 * Keeps filter state in the URL's query string. This means filters
 * survive navigating away and back (e.g. opening a product detail
 * page and returning), browser back/forward, and are shareable links.
 */
export function useUrlFilters<T extends Record<string, string>>(defaults: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const result = { ...defaults } as T;
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const value = searchParams.get(key as string);
      if (value !== null) result[key] = value as T[keyof T];
    }
    return result;
  }, [searchParams, defaults]);

  const setFilters = useCallback(
    (next: T) => {
      const params = new URLSearchParams();
      for (const key of Object.keys(next) as (keyof T)[]) {
        const value = next[key];
        // Omit values equal to default to keep URLs clean.
        if (value && value !== defaults[key]) {
          params.set(key as string, value as string);
        }
      }
      setSearchParams(params, { replace: true });
    },
    [defaults, setSearchParams]
  );

  return [filters, setFilters] as const;
}
