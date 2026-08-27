import { useCallback, useRef, useSyncExternalStore } from 'react';

type ServerSnapshot = () => boolean;

type Options = {
  getServerSnapshot?: ServerSnapshot;
};

type Cache = [query: string, mql: MediaQueryList];

const defaultServerSnapshot = () => false;

export const useMediaQuery = (
  query: string,
  { getServerSnapshot = defaultServerSnapshot }: Options = {}
) => {
  const normalized = normalize(query);
  const cacheRef = useRef<Cache | null>(null);

  /**
   * `window.matchMedia` is resolved lazily, so the hook stays server-safe, and
   * cached per query, so React can call `getSnapshot` on every render without
   * allocating a new MediaQueryList each time.
   */
  const getMediaQueryList = useCallback(() => {
    let cache = cacheRef.current;

    if (cache?.[0] !== normalized) {
      cache = [normalized, window.matchMedia(normalized)];
      cacheRef.current = cache;
    }

    return cache[1];
  }, [normalized]);

  const subscribe = useCallback(
    (listener: () => void) => {
      const mql = getMediaQueryList();

      mql.addEventListener('change', listener);

      return () => {
        mql.removeEventListener('change', listener);
      };
    },
    [getMediaQueryList]
  );

  const getSnapshot = useCallback(
    () => getMediaQueryList().matches,
    [getMediaQueryList]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

function normalize(query: string) {
  return query.replace(/^@media\s*/, '');
}
