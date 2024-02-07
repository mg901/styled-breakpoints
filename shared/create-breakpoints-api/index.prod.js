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

  return {
    keys,
    getNextKey,
    up,
    down,
    between,
  };

  // Get the minimum breakpoint value.
  function up(min) {
    return breakpoints[min];
  }

  // Get the maximum breakpoint value using calcMaxWidth.
  function down(max) {
    return calcMaxWidth(breakpoints[max]);
  }

  // Get the key of the next breakpoint.
  function getNextKey(key) {
    return keys[indexMap[key] + 1];
  }

  // Get a range between two breakpoints.
  function between(min, max) {
    return {
      min: up(min),
      max: down(max),
    };
  }
};
