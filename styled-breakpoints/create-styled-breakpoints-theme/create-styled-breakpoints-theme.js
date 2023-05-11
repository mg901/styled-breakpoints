const { createBreakpoints } = require('../../breakpoints');
const { withOrientation } = require('../with-orientation');
const { memoize } = require('../memoize');

const DEFAULT_OPTIONS = {
  errorPrefix: '[styled-breakpoints]: ',
  defaultBreakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
};

exports.createStyledBreakpointsTheme = ({
  defaultBreakpoints,
  errorPrefix,
} = DEFAULT_OPTIONS) => {
  const bp = createBreakpoints({
    breakpoints: defaultBreakpoints,
    errorPrefix,
  });

  return {
    breakpoints: {
      up: memoize((name, orientation) =>
        withOrientationOrNot(orientation, withMedia(withMinWidth(bp.up(name))))
      ),
      down: memoize((name, orientation) =>
        withOrientationOrNot(
          orientation,
          withMedia(withMaxWidth(bp.down(name)))
        )
      ),
      between: memoize((min, max, orientation) =>
        withOrientationOrNot(
          orientation,
          withMinAndMaxMedia(bp.between(min, max))
        )
      ),
      only: memoize((name, orientation) =>
        withOrientationOrNot(
          orientation,
          typeof bp.only(name) === 'object'
            ? withMinAndMaxMedia(bp.only(name))
            : withMedia(withMinWidth(bp.up(name)))
        )
      ),
    },
  };

  function withOrientationOrNot(orientation, result) {
    return orientation
      ? withOrientation({
          mediaQuery: result,
          orientation,
          invariant: bp.invariant && bp.invariant,
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
