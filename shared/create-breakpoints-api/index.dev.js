// @ts-check

const { createBreakpointsApi: coreApi } = require('./index.prod');
const { createInvariant } = require('../create-invariant');

/**
 * Creates an API for managing breakpoints.
 *
 * @param {{
 *  errorPrefix: string,
 *  breakpoints: Record<string, `${string}px`>
 * }} options - Configuration object with error prefix and breakpoints.
 * @returns {{
 *  keys: string[],
 *  invariant(condition: boolean, message?: string): void,
 *  getNextKey(key: string): string | undefined,
 *  up(min: string): `${string}px`,
 *  down(max: string): `${string}px`,
 *  between(min: string, max: string): { min: `${string}px`, max: `${string}px` }
 * }}
 */
exports.createBreakpointsApi = ({ errorPrefix, breakpoints }) => {
  const validation = createValidation({
    errorPrefix,
    breakpoints,
  });

  validation.validateBreakpoints();

  const api = coreApi({
    breakpoints,
  });

  return {
    keys: api.keys,
    invariant: validation.invariant,
    getNextKey: api.getNextKey,
    up,
    down,
    between,
  };

  /**
   * Get the minimum breakpoint value.
   *
   * @param {string} min - The key of the breakpoint.
   * @returns {`${string}px`} - The minimum breakpoint value.
   */
  function up(min) {
    validation.validateKey(min);

    // @ts-ignore /* istanbul ignore next */
    return api.up(min);
  }

  /**
   * Get the maximum breakpoint value.
   *
   * @param {string} max - The key of the breakpoint.
   * @returns {`${string}px`} - The maximum breakpoint value.
   */
  function down(max) {
    validation.validateKey(max);
    validation.validateNonZeroValue(max);

    // @ts-ignore /* istanbul ignore next */
    return api.down(max);
  }

  /**
   * Get a range between two breakpoints.
   *
   * @param {string} min - The key for the minimum breakpoint.
   * @param {string} max - The key for the maximum breakpoint.
   * @returns {{ min: `${string}px`, max: `${string}px` }}
   */
  function between(min, max) {
    validation.validateKey(min);
    validation.validateKey(max);
    validation.validateMaxIsGreaterOrEqualToMin(min, max);

    // @ts-ignore /* istanbul ignore next */
    return api.between(min, max);
  }
};

/**
 * Creates a validation object for breakpoints.
 *
 * @param {{
 *  errorPrefix: string,
 *  breakpoints: Record<string, `${string}px`>
 * }} options - Configuration object with error prefix and breakpoints.
 * @returns {{
 *  invariant(condition: boolean, message: string): void,
 *  validateBreakpoints(): void,
 *  validateKey(key: string): void,
 *  validateNonZeroValue(key: string): void,
 *  validateMaxIsGreaterOrEqualToMin(min: string, max: string): void
 * }}
 */
function createValidation({ errorPrefix, breakpoints }) {
  const invariant = createInvariant(errorPrefix);
  const keys = Object.keys(Object(breakpoints));

  return {
    invariant,
    validateBreakpoints,
    validateKey,
    validateNonZeroValue,
    validateMaxIsGreaterOrEqualToMin,
  };

  function validateBreakpoints() {
    const VALID_PATTERN = /^\d+px$/;

    /**
     *
     * @param {string[]} acc
     * @param {string} key
     * @returns  {string[]}
     */
    const reducer = (acc, key) => {
      // Check the validity of breakpoint values
      if (!VALID_PATTERN.test(breakpoints[key].trim())) {
        acc.push(`${key}: ${breakpoints[key]}`);
      }

      return acc;
    };

    const invalidBreakpoints = keys.reduce(reducer, []);

    // Throw an error if there are invalid breakpoints
    invariant(
      invalidBreakpoints.length === 0,
      `The following breakpoints are invalid: \`${invalidBreakpoints.join(
        ', '
      )}\`. Use values with pixel units (e.g., '200px').`
    );
  }

  /**
   * Validates if the provided key exists in the breakpoints.
   *
   * @param {string} key - The key to validate.
   * @returns {void}
   * @throws {Error} - Throws an error if the key is not found in the breakpoints.
   */
  function validateKey(key) {
    invariant(
      Boolean(breakpoints[key]),
      `Breakpoint \`${key}\` not found in ${keys.join(', ')}.`
    );
  }

  /**
   * Validates that the value associated with the given key is not zero after removing units.
   *
   * @param {string} key - The key of the breakpoint to validate.
   * @returns {void}
   * @throws {Error} - Throws an error if the value associated with the key is zero after removing units.
   */
  function validateNonZeroValue(key) {
    const value = breakpoints[key];

    invariant(
      removeUnits(value) !== 0,
      `\`${key}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  }

  /**
   * Validates that the `max` value is greater than or equal to the `min` value.
   *
   * @param {string} min - The key for the minimum breakpoint.
   * @param {string} max - The key for the maximum breakpoint.
   * @returns {void}
   * @throws {Error} - Throws an error if `max` is less than `min`.
   */
  function validateMaxIsGreaterOrEqualToMin(min, max) {
    const diff = removeUnits(breakpoints[max]) - removeUnits(breakpoints[min]);

    invariant(diff >= 0, 'The `max` value cannot be less than the `min`.');
  }
}

/**
 * Removes units from a value and converts it to a number.
 *
 * @param {string} value - The value with units (e.g., '200px').
 * @returns {number} - The numeric part of the value.
 */
function removeUnits(value) {
  return parseInt(value, 10) || 0;
}
