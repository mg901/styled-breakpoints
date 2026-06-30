import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query, { getServerSnapshot = () => false } = {}) {
  const normalized = normalize(query);

  const onStoreChange = useCallback(
    (listener) => subscribe(normalized, listener),
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
}

const subscribe = (query, listener) => {
  const mql = window.matchMedia(normalize(query));

  mql.addEventListener('change', listener);

  return () => {
    mql.removeEventListener('change', listener);
  };
};

const getSnapshot = (query) => {
  return window.matchMedia(normalize(query)).matches;
};

function normalize(query) {
  return query.replace(/^@media\s*/, '');
}
