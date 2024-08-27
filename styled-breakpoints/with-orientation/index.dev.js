// @ts-check

const { withOrientation: withOrientationProd } = require('./index.prod');

/**
 * @typedef {Object} Options
 * @property {string} mediaQuery - The media query string (e.g., '@media screen').
 * @property {string} orientation - The orientation type (e.g., 'portrait' or 'landscape').
 * @property {(condition: boolean, message?: string) => void} invariant - A function to assert conditions; throws an error if the condition is false.
 */

/**
 * Creates a media query string that includes orientation criteria.
 *
 * @param {Options} options - Options for generating the media query.
 * @returns - The media query string with orientation criteria.
 */
exports.withOrientation = ({ mediaQuery, orientation, invariant }) => {
  const isValid = orientation === 'portrait' || orientation === 'landscape';

  invariant(
    isValid,
    `\`${orientation}\` is invalid orientation. Please use \`landscape\` or \`portrait\`.`
  );

  /* istanbul ignore next */
  return withOrientationProd({
    mediaQuery,
    orientation,
  });
};
