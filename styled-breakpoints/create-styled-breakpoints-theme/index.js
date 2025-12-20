// @ts-check

const { createBreakpointsApi } = require('../../core/create-breakpoints');
const { memoize } = require('../../core/memoize');
const { withOrientation } = require('../with-orientation');

/**
 * Default configuration options for creating breakpoints.
 *
 * @type {{
 *   errorPrefix: string,
 *   breakpoints: Record<string, `${string}px`>
 * }}
 */
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
 * Options for creating a styled breakpoints theme.
 *
 * @typedef {Object} Options
 * @property {string} errorPrefix - An optional prefix for error messages.
 * @property {Record<string, `${string}px`>} breakpoints - An object defining breakpoints with pixel values.
 */

/**
 * The styled breakpoints theme object.
 *
 * @typedef {Object} StyledBreakpointsTheme
 * @property {Object} breakpoints - An object containing breakpoint functions.
 * @property {Function} breakpoints.up - Function to create a media query for a minimum width.
 * @property {Function} breakpoints.down - Function to create a media query for a maximum width.
 * @property {Function} breakpoints.between - Function to create a media query for a range between two breakpoints.
 * @property {Function} breakpoints.only - Function to create a media query for a specific breakpoint or range.
 */

/**
 * Creates a styled breakpoints theme.
 *
 * @param {Options} options - Configuration object with error prefix and breakpoints.
 * @returns {StyledBreakpointsTheme} A theme object with breakpoint functions.
 */
exports.createStyledBreakpointsTheme = ({
  breakpoints,
  errorPrefix,
} = DEFAULT_OPTIONS) => {
  const api = createBreakpointsApi({
    errorPrefix,
    breakpoints,
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
   * @param {string} min - The minimum width value as a breakpoint key.
   * @param {'portrait' | 'landscape'} [orientation] - Optional orientation for the media query.
   * @returns {string} A media query string specifying the minimum width.
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
   * @param {string} max - The maximum width value as a breakpoint key.
   * @param {'portrait' | 'landscape'} [orientation] - Optional orientation for the media query.
   * @returns {string} A media query string specifying the maximum width.
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
   * @param {string} min - The minimum width value as a breakpoint key.
   * @param {string} max - The maximum width value as a breakpoint key.
   * @param {'portrait' | 'landscape'} [orientation] - Optional orientation for the media query.
   * @returns {string} A media query string specifying the range between the minimum and maximum widths.
   */
  function between(min, max, orientation) {
    return withOrientationOrNot(
      withRangeMedia(api.between(min, max)),
      orientation
    );
  }

  /**
   * Creates a media query that targets a specific breakpoint or a single segment of screen sizes.
   * This function generates a media query that includes both minimum and maximum width constraints
   * to target a particular range of screen sizes. If the specified breakpoint is the last one in the list,
   * it only applies a minimum width constraint.
   *
   * @param {string} key - The breakpoint key to target, defined in the theme's breakpoints.
   * @param {'portrait' | 'landscape'} [orientation] - Optional orientation for the media query.
   * @returns {string} A media query string that targets a specific screen size segment, using minimum and maximum breakpoint widths.
   */
  function only(key, orientation) {
    const isLastKey = key === api.keys.at(-1);

    const mediaQuery = isLastKey
      ? withMedia(withMinWidth(api.up(key)))
      : // @ts-ignore
        withRangeMedia(api.between(key, api.getNextKey(key)));

    return withOrientationOrNot(mediaQuery, orientation);
  }

  /**
   * Applies orientation if provided or returns the media query without it.
   *
   * @param {string} mediaQuery - The base media query string.
   * @param {'portrait' | 'landscape'} [orientation] - Optional orientation for the media query.
   * @returns {string} A media query string with or without orientation applied.
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
};

/**
 * Generates a media query string for a minimum width constraint.
 *
 * @param {string} value - The minimum width.
 * @returns {string} A media query string specifying the minimum width.
 */
function withMinWidth(value) {
  return `(min-width: ${value})`;
}

/**
 * Wraps a given CSS rule or condition in a media query.
 *
 * @param {string} value - A CSS rule.
 * @returns {string} A media query string with the specified CSS rule.
 */
function withMedia(value) {
  return `@media ${value}`;
}

/**
 * Generates a media query string for a maximum width constraint.
 *
 * @param {string} value - The maximum width.
 * @returns {string} A media query string specifying the maximum width.
 */
function withMaxWidth(value) {
  return `(max-width: ${value})`;
}

/**
 * Generates a media query string for a given range of minimum and maximum widths.
 *
 * @param {{min: string, max: string}} param0 - An object containing the minimum and maximum width.
 * @returns {string} A media query string that represents the specified range of min and max widths.
 */
function withRangeMedia({ min, max }) {
  return `${withMedia(withMinWidth(min))} and ${withMaxWidth(max)}`;
}
