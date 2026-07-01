import { useCallback, useSyncExternalStore } from 'react';

type ServerSnapshot = () => boolean;

type Options = {
  getServerSnapshot?: ServerSnapshot;
};

const defaultServerSnapshot = () => false;

export const useMediaQuery = (
  query: string,
  { getServerSnapshot = defaultServerSnapshot }: Options = {}
) => {
  const normalized = normalize(query);

  const onStoreChange = useCallback(
    (listener: () => void) => subscribe(normalized, listener),
    [normalized]
  );

  const getNormalizedSnapshot = useCallback(
    () => getSnapshot(normalized),
    [normalized]
  );

  return useSyncExternalStore(
    onStoreChange,
    getNormalizedSnapshot,
    getServerSnapshot
  );
};

const subscribe = (query: string, listener: () => void) => {
  const mql = window.matchMedia(normalize(query));

  mql.addEventListener('change', listener);

  return () => {
    mql.removeEventListener('change', listener);
  };
};

const getSnapshot = (query: string) => {
  return window.matchMedia(normalize(query)).matches;
};

function normalize(query: string) {
  return query.replace(/^@media\s*/, '');
}

useMediaQuery('a', {
  getServerSnapshot: () => true,
});
