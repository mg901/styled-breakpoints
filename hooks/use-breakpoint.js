const { useState, useEffect, useMemo } = require('react');

exports.createUseBreakpoint =
  ({ theme: useTheme }) =>
  (breakpoint) => {
    const [isBreak, setIsBreak] = useState(null);
    const mediaQuery = breakpoint({
      theme: useTheme(),
    });
    const mq = useMemo(
      () =>
        typeof window === 'undefined'
          ? false
          : window.matchMedia(mediaQuery.replace(/^@media\s*/, '')),
      [mediaQuery]
    );

    useEffect(() => {
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
    }, [mq]);

    return isBreak;
  };
