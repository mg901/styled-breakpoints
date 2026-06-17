// @ts-check
const { useSyncExternalStore } = require('react');

exports.useMediaQuery = useMediaQuery;

/**
 * React hook for checking whether a CSS media query matches.
 *
 * Works both in the browser and in SSR:
 * — does not access `window` on the server
 * — allows setting an initial value to prevent hydration mismatch
 *
 * @param {string} query
 * CSS media query. Can be provided with or without the `@media` prefix.
 *
 * @param {Object} [options]
 * @param {boolean} [options.defaultValue=false]
 * Value used on the server and as a fallback.
 *
 * @param {boolean} [options.initializeWithValue=true]
 * If `true`, the initial state is computed immediately from the media query.
 * If `false`, `defaultValue` is used until the first effect runs.
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
