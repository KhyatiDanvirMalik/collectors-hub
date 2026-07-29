import { useCallback, useEffect, useRef, useState } from 'react';
import type { AsyncState } from '../types';

/**
 * Runs an async fetcher and tracks { data, isLoading, error }.
 * Re-runs whenever `deps` changes. Exposes `retry()` for error states
 * so the UI can offer a "Try again" action.
 */
export function useAsync<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  // Guards against setting state after unmount / after a newer request
  // has already started (avoids race conditions on fast filter changes).
  const requestId = useRef(0);

  const run = useCallback(() => {
    const currentRequest = ++requestId.current;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    fetcher()
      .then((data) => {
        if (currentRequest === requestId.current) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((err: Error) => {
        if (currentRequest === requestId.current) {
          setState({ data: null, isLoading: false, error: err.message || 'Something went wrong.' });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, retry: run };
}
