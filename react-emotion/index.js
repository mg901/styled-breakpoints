const { useState, useEffect, useCallback } = require('react');
const { useTheme } = require('@emotion/react');

const useBreakpoint = (breakpoint) => {
  // Get the media query to match
  const query = breakpoint({
    theme: useTheme(),
  }).replace(/^@media\s*/, '');

  // null means "indeterminate", eg if the `window` object isn't available
  const [isBreak, setIsBreak] = useState(null);

  // Handler for the media query change event
  const handleChange = useCallback((event) => {
    setIsBreak(event.matches);
  }, []);

  // Set up a media query matcher on mount and if the query changes
  useEffect(() => {
    const mq = window.matchMedia(query);

    // Ensure the correct value is set in state as soon as possible
    setIsBreak(mq.matches);

    // Update the state whenever the media query match state changes
    mq.addEventListener('change', handleChange);

    // Clean up on unmount and if the query changes
    return function cleanup() {
      mq.removeEventListener('change', handleChange);
    };
  }, [query, handleChange]);

  // Return the current match state
  return isBreak;
};

module.exports = {
  useBreakpoint,
};
