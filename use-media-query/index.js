// @ts-check

const { useState, useLayoutEffect, useEffect } = require('react');

exports.useMediaQuery = useMediaQuery;

/* istanbul ignore next */
const IS_BROWSER = typeof window !== 'undefined';
/* istanbul ignore next */
const useEnhancedEffect = IS_BROWSER ? useLayoutEffect : useEffect;

exports.useMediaQuery = useMediaQuery;

/**
 * Custom hook for handling media queries.
 *
 * @param {string} query - The media query to match.
 * @returns {boolean} - `true` if the media query matches the current state, `false` otherwise.
 */
function useMediaQuery(query) {
  const [isMatch, setIsMatch] = useState(IS_BROWSER && getInitialState(query));

  useEnhancedEffect(() => {
    let mounted = true;
    const mediaQueryList = window.matchMedia(query.replace(/^@media\s*/, ''));

    const handleChange = () => {
      /* istanbul ignore next */
      if (!mounted) return;

      /* istanbul ignore next */
      setIsMatch(mediaQueryList.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);
    setIsMatch(mediaQueryList.matches);

    return () => {
      mounted = false;

      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return isMatch;
}

/**
 * Gets the initial state of a media query.
 *
 * @param {string} query - The media query string.
 * @returns {boolean} - `true` if the media query matches the current state, `false` otherwise.
 */
function getInitialState(query) {
  return window.matchMedia(query).matches;
}
