const { createBreakpointsApi } = require('../../breakpoints');
const { withOrientation } = require('../with-orientation');
const { memoize } = require('../memoize');

const DEFAULT_OPTIONS = {
  errorPrefix: '[styled-breakpoints]: ',
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
};

exports.createStyledBreakpointsTheme = ({
  breakpoints,
  errorPrefix,
} = DEFAULT_OPTIONS) => {
  const api = createBreakpointsApi({
    breakpoints,
    errorPrefix,
  });

  return {
    breakpoints: {
      up: memoize(up),
      down: memoize(down),
      between: memoize(between),
      only: memoize(only),
    },
  };

  function up(min, orientation) {
    return withOrientationOrNot(
      orientation,
      withMedia(withMinWidth(api.up(min)))
    );
  }

  function down(max, orientation) {
    return withOrientationOrNot(
      orientation,
      withMedia(withMaxWidth(api.down(max)))
    );
  }

  function between(min, max, orientation) {
    return withOrientationOrNot(
      orientation,
      withMinAndMaxMedia(api.between(min, max))
    );
  }

  function only(key, orientation) {
    return withOrientationOrNot(
      orientation,
      typeof api.only(key) === 'object'
        ? withMinAndMaxMedia(api.only(key))
        : withMedia(withMinWidth(api.up(key)))
    );
  }

  function withOrientationOrNot(orientation, result) {
    return orientation
      ? withOrientation({
          mediaQuery: result,
          orientation,
          invariant: api.invariant && api.invariant,
        })
      : result;
  }

  function withMinWidth(value) {
    return `(min-width: ${value})`;
  }

  function withMedia(value) {
    return `@media ${value}`;
  }

  function withMaxWidth(value) {
    return `(max-width: ${value})`;
  }

  function withMinAndMaxMedia({ min, max }) {
    return `${withMedia(withMinWidth(min))} and ${withMaxWidth(max)}`;
  }
};
