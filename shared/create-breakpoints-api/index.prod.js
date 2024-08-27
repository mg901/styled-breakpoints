// @ts-check

const { calcMaxWidth } = require('../calc-max-width');
/**
 * Creates an object with breakpoints
 *
 * @param {{
 *   breakpoints: Record<string,`${string}px`>
 * }} options - An object defining breakpoints.
 *
 * @returns {{
 *  keys: string[]
 *  getNextKey(key: string): string | undefined
 *  up(min: string): `${string}px` | undefined
 *  down(max: string): `${string}px` | undefined
 *  between(min: string, max: string): {
 *    min: `${string}px` | undefined,
 *    max: `${string}px` | undefined
 *  }
 * }} - An object with breakpoint functions
 */
exports.createBreakpointsApi = ({ breakpoints }) => {
  /**
   * @type {Record<string, number>}
   */
  const indexMap = {};
  const keys = Object.keys(breakpoints);

  keys.forEach((key, index) => {
    indexMap[key] = index;
  });

  return {
    keys,
    getNextKey,
    up,
    down,
    between,
  };

  /**
   * Get the key of the next breakpoint.
   *
   * @param {string} key - The key of the current breakpoint
   * @returns {string | undefined} - The key of the next breakpoint or undefined if not found.
   */
  function getNextKey(key) {
    return keys[indexMap[key] + 1];
  }

  /**
   * Get the minimum breakpoint value.
   *
   * @param {string} min - The key of the breakpoint
   * @returns {`${string}px` | undefined} - The minimum breakpoint value or undefined if not found.
   */
  function up(min) {
    return breakpoints[min];
  }

  /**
   * Get the maximum breakpoint value using calcMaxWidth.
   *
   * @param {string} max - The key of the breakpoint
   * @returns {`${string}px` | undefined} - The maximum breakpoint value or undefined if not found.
   */
  function down(max) {
    return breakpoints[max] ? calcMaxWidth(breakpoints[max]) : undefined;
  }

  /**
   * Get a range between two breakpoints.
   *
   * @param {string} min
   * @param {string} max
   * @returns {{
   *  min: `${string}px` | undefined,
   *  max: `${string}px` | undefined
   * }}
   */
  function between(min, max) {
    return {
      min: up(min),
      max: down(max),
    };
  }
};
