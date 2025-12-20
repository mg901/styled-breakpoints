// @ts-check
const { useState, useLayoutEffect, useEffect } = require('react');

const IS_SERVER = typeof window === 'undefined';
const useIsomorphicLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;

exports.useMediaQuery = useMediaQuery;

/**
 * @param {string} query
 * @param {{ defaultValue?: boolean, initializeWithValue?: boolean }} [options]
 * @returns {boolean}
 */
function useMediaQuery(
  query,
  { defaultValue = false, initializeWithValue = true } = {}
) {
  const [isMatch, setIsMatch] = useState(() => {
    if (initializeWithValue) {
      return getMatches();
    }

    return defaultValue;
  });

  function getMatches() {
    if (IS_SERVER) return defaultValue;

    return window.matchMedia(normalizeQuery(query)).matches;
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

  function handleChange() {
    setIsMatch(getMatches());
  }

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
