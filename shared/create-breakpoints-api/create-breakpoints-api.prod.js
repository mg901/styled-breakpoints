const { calcMaxWidth } = require('../calc-max-width');
/**
 * Creates an object with breakpoints
 * @param {Object} options - The options for creating the theme.
 * @param {Object} options.breakpoints - An object defining breakpoints.
 * @returns {Object} - An object with breakpoint functions
 */
exports.createBreakpointsApi = ({ breakpoints }) => {
  const indexMap = {};
  const keys = Object.keys(breakpoints);

  keys.forEach((key, index) => {
    indexMap[key] = index;
  });

  /**
   * Get the minimum breakpoint value.
   * @param {string} min - The breakpoint key.
   * @returns {string} - The minimum breakpoint value.
   */
  const up = (min) => breakpoints[min];

  /**
   * Get the maximum breakpoint value using calcMaxWidth.
   * @param {string} max - The breakpoint key.
   * @returns {string} - The maximum breakpoint value.
   */
  const down = (max) => calcMaxWidth(breakpoints[max]);

  /**
   * Get the key of the next breakpoint.
   * @param {string} key - The current breakpoint key.
   * @returns {string|undefined} - The key of the next breakpoint, or undefined if the current key is the last one.
   */
  const getNextKey = (key) => {
    return keys[indexMap[key] + 1];
  };

  /**
   * Get a range between two breakpoints.
   * @param {string} min - The minimum breakpoint key.
   * @param {string} max - The maximum breakpoint key.
   * @returns {Object} - An object with 'min' and 'max' properties containing the corresponding breakpoint values.
   */
  const between = (min, max) => ({
    min: up(min),
    max: down(max),
  });

  return {
    keys,
    getNextKey,
    up,
    down,
    between,
  };
};
