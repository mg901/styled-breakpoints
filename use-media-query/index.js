// @ts-check
const { useState, useLayoutEffect, useEffect } = require('react');

const IS_SERVER = typeof window === 'undefined';
const useIsomorphicLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;

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
function useMediaQuery(
  query,
  { defaultValue = false, initializeWithValue = true } = {}
) {
  function getMatches() {
    if (IS_SERVER) return defaultValue;

    return window.matchMedia(normalizeQuery(query)).matches;
  }

  const [isMatch, setIsMatch] = useState(() => {
    if (initializeWithValue) {
      return getMatches();
    }

    /* istanbul ignore next */
    return defaultValue;
  });

  function handleChange() {
    setIsMatch(getMatches());
  }

  useIsomorphicLayoutEffect(() => {
    if (IS_SERVER) return;

    const mediaQueryList = window.matchMedia(normalizeQuery(query));

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);

    // eslint-disable-next-line consistent-return
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return isMatch;
}

/**
 *
 * @param {string} query
 * @returns {string}
 */
function normalizeQuery(query) {
  return query.replace(/^@media\s*/, '');
}
