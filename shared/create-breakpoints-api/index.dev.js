const { createBreakpointsApi: coreApi } = require('./index.prod');
const { createInvariant } = require('../create-invariant');

const DEFAULT_ERROR_PREFIX = '[breakpoints]: ';
exports.DEFAULT_ERROR_PREFIX = DEFAULT_ERROR_PREFIX;

exports.createBreakpointsApi = ({
  breakpoints,
  /* istanbul ignore next */
  errorPrefix = DEFAULT_ERROR_PREFIX,
}) => {
  const invariant = createInvariant(errorPrefix);
  const validation = createValidation({
    invariant,
    breakpoints,
  });

  validation.validateBreakpoints();

  const api = coreApi({
    breakpoints,
  });

  return {
    keys: api.keys,
    invariant,
    getNextKey: api.getNextKey,
    up,
    down,
    between,
  };

  function up(min) {
    validation.validateKey(min);

    /* istanbul ignore next */
    return api.up(min);
  }

  function down(max) {
    validation.validateKey(max);
    validation.validateNonZeroValue(max);

    /* istanbul ignore next */
    return api.down(max);
  }

  function between(min, max) {
    validation.validateKey(min);
    validation.validateKey(max);
    validation.validateMaxIsGreaterOrEqualToMin(min, max);

    /* istanbul ignore next */
    return api.between(min, max);
  }
};

function createValidation({ invariant, breakpoints }) {
  const keys = Object.keys(Object(breakpoints));

  return {
    validateBreakpoints,
    validateKey,
    validateNonZeroValue,
    validateMaxIsGreaterOrEqualToMin,
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
    invariant(
      breakpoints[key],
      `Breakpoint \`${key}\` not found in ${keys.join(', ')}.`
    );
  }

  // Check that a breakpoint is not equal to 0.
  function validateNonZeroValue(key) {
    const value = breakpoints[key];

    invariant(
      removeUnits(value) !== 0,
      `\`${key}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  }

  function validateMaxIsGreaterOrEqualToMin(min, max) {
    const diff = removeUnits(breakpoints[max]) - removeUnits(breakpoints[min]);

    invariant(diff >= 0, 'The `max` value cannot be less than the `min`.');
  }
}

function removeUnits(value) {
  return parseInt(value, 10) || 0;
}
