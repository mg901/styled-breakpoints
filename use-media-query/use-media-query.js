const { useState, useLayoutEffect, useEffect } = require('react');

const isBrowser = typeof window !== 'undefined';
const useEnhancedEffect = isBrowser ? useLayoutEffect : useEffect;

/**
 * Custom hook for handling media queries.
 *
 * @param {string} [query=''] - The media query to match.
 * @returns {boolean} - `true` if the media query matches, otherwise `false`.
 */
const useMediaQuery = (query = '') => {
  const [isMatch, setIsMatch] = useState(getMatches(query));

  useEnhancedEffect(() => {
    let mounted = true;
    const mediaQueryList = window.matchMedia(query.replace(/^@media\s*/, ''));

    const handleChange = () => {
      if (!mounted) return;

      setIsMatch(mediaQueryList.matches);
    };

    // Safari < 14 can't use addEventListener on a MediaQueryList
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Browser_compatibility
    if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handleChange);
    } else {
      mediaQueryList.addEventListener('change', handleChange);
    }

    setIsMatch(mediaQueryList.matches);

    return () => {
      mounted = false;

      if (mediaQueryList.addListener) {
        mediaQueryList.removeListener(handleChange);
      } else {
        mediaQueryList.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return isMatch;
};

exports.useMediaQuery = useMediaQuery;

function getMatches(query) {
  // Prevents SSR issues
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }

  return false;
}
