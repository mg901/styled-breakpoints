const { useSyncExternalStore } = require('react');

exports.useMediaQuery = useMediaQuery;

/**
 * React hook for checking whether a CSS media query matches.
 *
 * @param {string} query
 * CSS media query. Can be provided with or without the `@media` prefix.
 *
 * @param {Object} [options] 
 * * Value used on the server and as a fallback.
 * @param {() => boolean} [options.getServerSnapshot=() => false]

 *
 * @returns {boolean}
 * `true` if the media query matches the current viewport.
 */
function useMediaQuery(query, { getServerSnapshot = () => false } = {}) {
  const normalized = normalize(query);

  return useSyncExternalStore(
    (listener) => subscribe(normalized, listener),
    () => getSnapshot(normalized),
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

/**
 *
 * @param {string} query
 * @returns {string}
 */
function normalize(query) {
  return query.replace(/^@media\s*/, '');
}
