const { createBreakpointsApi } = require('./create-breakpoints-api.prod');
const { createInvariant } = require('./create-invariant');

/**
 * Creates a theme with breakpoints.
 * @param {Object} options - The options for creating the theme.
 * @param {Object} options.breakpoints - An object defining breakpoints.
 * @param {String} options.errorPrefix - The error prefix for validation.
 * @returns {Object} - A theme object with breakpoint functions.
 */
exports.createBreakpointsApi = ({ breakpoints, errorPrefix }) => {
  // Create an object for input validation
  const invariant = createInvariant(errorPrefix);
  const validation = createValidation({
    invariant,
    breakpoints,
  });

  validation.validateBreakpoints();

  // Create a breakpoints API
  const api = createBreakpointsApi({
    breakpoints,
  });

  /**
   * Get the minimum breakpoint value.
   * @param {string} min - The breakpoint key.
   * @returns {string} - The minimum breakpoint value.
   */
  const up = (min) => {
    // Check input data validity
    validation.validateKey(min);

    return api.up(min);
  };

  /**
   * Get the maximum breakpoint value using calcMaxWidth.
   * @param {string} max - The breakpoint key.
   * @returns {string} - The maximum breakpoint value.
   */
  const down = (max) => {
    // Check input data validity
    validation.validateKey(max);
    validation.validateNonZeroValue(max);

    return api.down(max);
  };

  /**
   * Get a range between two breakpoints.
   * @param {string} min - The minimum breakpoint key.
   * @param {string} max - The maximum breakpoint key.
   * @returns {Object} - An object with 'min' and 'max' properties containing the corresponding breakpoint values.
   */
  const between = (min, max) => {
    // Check input data validity
    validation.validateKey(min);
    validation.validateKey(max);
    validation.validateMaxGreaterThanMin(min, max);

    return api.between(min, max);
  };

  /**
   * Get a range based on a single breakpoint key.
   * @param {string} key - The breakpoint key.
   * @returns {string|Object} - The minimum or a range object based on the provided key.
   */
  const only = (key) => {
    // Check input data validity
    validation.validateKey(key);

    return api.only(key);
  };

  return {
    keys: api.keys,
    invariant,
    getNextKey: api.getNextKey,
    up,
    down,
    between,
    only,
  };
};

function createValidation({ invariant, breakpoints }) {
  const keys = Object.keys(Object(breakpoints));

  return {
    validateBreakpoints,
    validateKey,
    validateNonZeroValue,
    validateMaxGreaterThanMin,
  };

  function validateBreakpoints() {
    const VALID_PATTERN = /^\d+px$/;
    const invalidBreakpoints = keys.reduce((acc, key) => {
      // Check the validity of breakpoint values
      if (!VALID_PATTERN.test(breakpoints[key].trim())) {
        acc.push(`${key}: ${breakpoints[key]}`);
      }

      return acc;
    }, []);

    // Throw an error if there are invalid breakpoints
    invariant(
      invalidBreakpoints.length === 0,
      `The following breakpoints are invalid: \`${invalidBreakpoints.join(
        ', '
      )}\`. Use values with pixel units (e.g., '200px').`
    );
  }

  function validateKey(key) {
    // Check if the specified breakpoint exists
    invariant(
      breakpoints[key],
      `breakpoint \`${key}\` not found in ${keys.join(', ')}.`
    );
  }

  function validateNonZeroValue(key) {
    const value = breakpoints[key];

    // Check that the breakpoint is not 0
    invariant(
      removeUnits(value) !== 0,
      `\`${key}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  }

  function validateMaxGreaterThanMin(min, max) {
    const diff = removeUnits(breakpoints[max]) - removeUnits(breakpoints[min]);

    // Check that `max` is greater than or equal to `min`
    invariant(diff >= 0, 'The `max` value cannot be less than the `min`.');
  }
}

function removeUnits(value) {
  return parseInt(value, 10);
}
