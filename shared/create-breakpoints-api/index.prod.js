// @ts-check

const { calcMaxWidth } = require('../calc-max-width');
/**
 * Creates an object with breakpoints
 *
 * @param {{
 *   errorPrefix?: string
 *   breakpoints: Record<string,`${string}px`>
 * }} options - An object defining breakpoints.
 *
 * @returns {{
 *  invariant?: (condition: boolean, message?: string) => void,
 *  keys: string[]
 *  getNextKey(key: string): string | undefined
 *  up(min: string): `${string}`
 *  down(max: string): `${string}`
 *  between(min: string, max: string): {
 *    min: `${string}px`,
 *    max: `${string}px`
 *  }
 * }} An object containing methods and properties for managing breakpoints.
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
   * @returns {string | undefined} The key of the next breakpoint or undefined if not found.
   */
  function getNextKey(key) {
    return keys[indexMap[key] + 1];
  }

  /**
   * Get the minimum breakpoint value.
   *
   * @param {string} min - The key of the breakpoint
   * @returns {`${string}px`} The minimum breakpoint value.
   */
  function up(min) {
    return breakpoints[min];
  }

  /**
   * Get the maximum breakpoint value using calcMaxWidth.
   *
   * @param {string} max - The key of the breakpoint
   * @returns {`${string}px`} The maximum breakpoint value.
   */
  function down(max) {
    return calcMaxWidth(breakpoints[max]);
  }

  /**
   * Get a range between two breakpoints.
   *
   * @param {string} min - The key for the minimum breakpoint.
   * @param {string} max - The key for the maximum breakpoint.
   * @returns {{
   *  min: `${string}px`,
   *  max: `${string}px`
   * }} An object containing the minimum and maximum width media query strings
   */
  function between(min, max) {
    return {
      min: up(min),
      max: down(max),
    };
  }
};
