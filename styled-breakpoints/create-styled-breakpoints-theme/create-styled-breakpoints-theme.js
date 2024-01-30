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

  /**
   * Creates a media query for a minimum width breakpoint.
   *
   * @param {String} min - The minimum breakpoint value.
   * @param {String} orientation - Optional orientation value.
   * @returns {String} - The media query string.
   */
  function up(min, orientation) {
    return withOrientationOrNot(
      withMedia(withMinWidth(api.up(min))),
      orientation
    );
  }

  /**
   * Creates a media query for a maximum width breakpoint.
   *
   * @param {String} max - The maximum breakpoint value.
   * @param {String} orientation - Optional orientation value.
   * @returns {String} - The media query string.
   */
  function down(max, orientation) {
    return withOrientationOrNot(
      withMedia(withMaxWidth(api.down(max))),
      orientation
    );
  }

  /**
   * Creates a media query for a range between two breakpoints.
   *
   * @param {String} min - The minimum breakpoint value.
   * @param {String} max - The maximum breakpoint value.
   * @param {String} orientation - Optional orientation value.
   * @returns {String} - The media query string.
   */
  function between(min, max, orientation) {
    return withOrientationOrNot(
      withMinAndMaxMedia(api.between(min, max)),
      orientation
    );
  }

  /**
   * Creates a media query for a specific breakpoint or range.
   *
   * @param {String} key - The breakpoint key.
   * @param {String} orientation - Optional orientation value.
   * @returns {String} - The media query string.
   */
  function only(key, orientation) {
    const mediaQuery =
      key === api.keys.at(-1)
        ? withMedia(withMinWidth(api.up(key)))
        : withMinAndMaxMedia(api.between(key, api.getNextKey(key)));

    return withOrientationOrNot(mediaQuery, orientation);
  }

  /**
   * Applies orientation if provided or returns the media query.
   *
   * @param {String} orientation - Optional orientation value.
   * @param {String} mediaQuery - The media query string.
   * @returns {String} - The media query with or without orientation.
   */
  function withOrientationOrNot(mediaQuery, orientation) {
    return orientation
      ? withOrientation({
          mediaQuery,
          orientation,
          invariant: api.invariant && api.invariant,
        })
      : mediaQuery;
  }

  /**
   * @param {String} value - The minimum width value.
   * @returns {String} - The media query string.
   */
  function withMinWidth(value) {
    return `(min-width: ${value})`;
  }

  /**
   * @param {String} value - The media query string.
   * @returns {String} - The media query wrapped with '@media'.
   */
  function withMedia(value) {
    return `@media ${value}`;
  }

  /**
   * @param {String} value - The maximum width value.
   * @returns {String} - The media query string.
   */
  function withMaxWidth(value) {
    return `(max-width: ${value})`;
  }

  /**
   * Creates a media query string for a range between minimum and maximum widths.
   *
   * @param {Object} options - The range options with minimum and maximum values.
   * @param {String} options.min - The minimum width value.
   * @param {String} options.max - The maximum width value.
   * @returns {String} - The media query string for the range.
   */
  function withMinAndMaxMedia({ min, max }) {
    return `${withMedia(withMinWidth(min))} and ${withMaxWidth(max)}`;
  }
};
