const { useState, useLayoutEffect, useEffect } = require('react');

const isBrowser = typeof window !== 'undefined';
const useEnhancedEffect = isBrowser ? useLayoutEffect : useEffect;

/**
 * Custom hook for handling media queries.
 * @param {string} query - The media query to match.
 * @returns {boolean} - `true` if the media query matches, otherwise `false`.
 */
exports.useMediaQuery = function useMediaQuery(query) {
  const [isMatch, setIsMatch] = useState(isBrowser && getMatches(query));

  useEnhancedEffect(() => {
    if (!isBrowser) return;

    let mounted = true;
    const mediaQueryList = window.matchMedia(query.replace(/^@media\s*/, ''));

    const handleChange = () => {
      if (!mounted) return;

      setIsMatch(mediaQueryList.matches);
    };

    // Safari < 14 can't use addEventListener on a MediaQueryList
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Browser_compatibility
    const listenerMethod = mediaQueryList.addListener
      ? 'addListener'
      : 'addEventListener';
    mediaQueryList[listenerMethod]('change', handleChange);

    setIsMatch(mediaQueryList.matches);

    // eslint-disable-next-line consistent-return
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

function getMatches(query) {
  return window.matchMedia(query).matches;
}
