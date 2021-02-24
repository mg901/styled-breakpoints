const {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} = require('react');
const { makeStyledBreakpoints } = require('../core');
const { isEmpty } = require('../core/library');

const { getBreakpointsFromTheme } = makeStyledBreakpoints();

const createUseBreakpoint = ({ useTheme }) => (breakpoint) => {
  const defaultTheme = {
    breakpoints: getBreakpointsFromTheme(),
  };

  const isEmptyTheme = isEmpty(useTheme());
  const theme = isEmptyTheme
    ? useContext(createContext(defaultTheme))
    : useTheme();

  // Get the media query to match
  const query = breakpoint({
    theme,
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

    // Safari < 14 can't use addEventListener on a MediaQueryList
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Browser_compatibility
    if (!mq.addEventListener) {
      // Update the state whenever the media query match state changes
      mq.addListener(handleChange);

      // Clean up on unmount and if the query changes
      return mq.removeListener(handleChange);
    }

    // Update the state whenever the media query match state changes
    mq.addEventListener('change', handleChange);

    // Clean up on unmount and if the query changes
    return mq.removeEventListener('change', handleChange);
  }, [query, handleChange]);

  // Return the current match state
  return isBreak;
};

module.exports = {
  createUseBreakpoint,
};
