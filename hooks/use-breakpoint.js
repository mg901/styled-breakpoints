const { useState, useEffect } = require('react');

exports.createUseBreakpoint =
  ({ theme: useTheme }) =>
  (breakpoint) => {
    // Get the media query to match
    const query = breakpoint({
      theme: useTheme(),
    }).replace(/^@media\s*/, '');
    const [isBreak, setIsBreak] = useState(null);

    useEffect(() => {
      const mq = window.matchMedia(query);
      const handleChange = (event) => {
        setIsBreak(event.matches);
      };

      setIsBreak(mq.matches);

      // Safari < 14 can't use addEventListener on a MediaQueryList
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Browser_compatibility
      if (!mq.addEventListener) {
        // Update the state whenever the media query match state changes
        mq.addListener(handleChange);

        // Clean up on unmount and if the query changes
        return () => {
          mq.removeListener(handleChange);
        };
      }
      mq.addEventListener('change', handleChange);

      return () => {
        mq.removeEventListener('change', handleChange);
      };
    }, [query]);

    return isBreak;
  };
