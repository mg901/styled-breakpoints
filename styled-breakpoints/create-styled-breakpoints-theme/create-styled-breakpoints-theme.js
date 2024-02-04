const { createBreakpointsApi } = require('../../shared/create-breakpoints-api');
const { memoize } = require('../../shared/memoize');
const { withOrientation } = require('../with-orientation');

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

/**
 * Creates a styled breakpoints theme.
 *
 * @param {Object} options - The options for creating the theme.
 * @param {Object} options.breakpoints - An object defining breakpoints.
 * @param {String} options.errorPrefix - An optional error prefix.
 * @returns {Object} - A theme object with breakpoint functions.
 */
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

  // Creates a media query for a minimum width breakpoint.
  function up(min, orientation) {
    return withOrientationOrNot(
      withMedia(withMinWidth(api.up(min))),
      orientation
    );
  }

  // Creates a media query for a maximum width breakpoint.
  function down(max, orientation) {
    return withOrientationOrNot(
      withMedia(withMaxWidth(api.down(max))),
      orientation
    );
  }

  // Creates a media query for a range between two breakpoints.
  function between(min, max, orientation) {
    return withOrientationOrNot(
      withRangeMedia(api.between(min, max)),
      orientation
    );
  }

  // Creates a media query for a specific breakpoint or range.
  function only(key, orientation) {
    const isLastKey = key === api.keys.at(-1);

    const mediaQuery = isLastKey
      ? withMedia(withMinWidth(api.up(key)))
      : withRangeMedia(api.between(key, api.getNextKey(key)));

    return withOrientationOrNot(mediaQuery, orientation);
  }

  // Applies orientation if provided or returns the media query.
  function withOrientationOrNot(mediaQuery, orientation) {
    return orientation
      ? withOrientation({
          mediaQuery,
          orientation,
          invariant: api.invariant && api.invariant,
        })
      : mediaQuery;
  }
};

function withMinWidth(value) {
  return `(min-width: ${value})`;
}

function withMedia(value) {
  return `@media ${value}`;
}

function withMaxWidth(value) {
  return `(max-width: ${value})`;
}

function withRangeMedia({ min, max }) {
  return `${withMedia(withMinWidth(min))} and ${withMaxWidth(max)}`;
}
