import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for data fetching with auto-refresh.
 *
 * @param {() => Promise<any>} fetcher  - Async function that returns data
 * @param {any[]} deps                  - Dependency array (re-fetches when deps change)
 * @param {number} interval             - Auto-refresh interval in ms (0 to disable)
 * @returns {{ data: any, error: Error|null, loading: boolean, refetch: () => void }}
 */
export function useFetch(fetcher, deps = [], interval = 0) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetcherRef = useRef(fetcher);

  // Keep fetcher ref current so the interval always calls the latest version
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const execute = useCallback(async () => {
    try {
      const result = await fetcherRef.current();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    execute();

    if (interval > 0) {
      const id = setInterval(execute, interval);
      return () => clearInterval(id);
    }
  }, [...deps, interval]);

  return { data, error, loading, refetch: execute };
}
