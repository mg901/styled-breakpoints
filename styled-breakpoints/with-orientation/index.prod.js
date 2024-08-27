// @ts-check

/**
 * @typedef {Object} Options
 * @property {string} mediaQuery - The media query string (e.g., '@media screen').
 * @property {string} orientation - The orientation type (e.g., 'portrait' or 'landscape').
 */

/**
 * Creates a media query string that includes orientation criteria.
 *
 * @param {Options} options - Options for generating the media query.
 * @returns - The media query string with orientation criteria.
 */
exports.withOrientation = ({ mediaQuery, orientation }) =>
  `${mediaQuery} and (orientation: ${orientation})`;
