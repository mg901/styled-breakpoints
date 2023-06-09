const { createBreakpointsApi } = require('./create-breakpoints-api.prod');
const { createInvariant } = require('./create-invariant');

exports.createBreakpointsApi = ({ breakpoints, errorPrefix }) => {
  const invariant = createInvariant(errorPrefix);
  const validation = createValidation({
    invariant,
    breakpoints,
  });

  validation.validateBreakpoints();

  const breakpointsApi = createBreakpointsApi({
    breakpoints,
  });

  const up = (min) => {
    validation.validateKey(min);

    return breakpointsApi.up(min);
  };

  const down = (max) => {
    validation.validateKey(max);
    validation.validateNonZeroValue(max);

    return breakpointsApi.down(max);
  };

  const between = (min, max) => {
    validation.validateKey(min);
    validation.validateKey(max);
    validation.validateMaxGreaterThanMin(min, max);

    return breakpointsApi.between(min, max);
  };

  const only = (key) => {
    validation.validateKey(key);

    return breakpointsApi.only(key);
  };

  return {
    keys: breakpointsApi.keys,
    invariant,
    getNextKey: breakpointsApi.getNextKey,
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
    const invalidBreakpoints = keys.reduce((acc, key) => {
      if (!/^\d+px$/.test(breakpoints[key].trim())) {
        acc.push(`${key}: ${breakpoints[key]}`);
      }

      return acc;
    }, []);

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
      `breakpoint \`${key}\` not found in ${keys.join(', ')}.`
    );
  }

  function validateNonZeroValue(key) {
    const value = breakpoints[key];

    invariant(
      removeUnits(value) !== 0,
      `\`${key}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  }

  function validateMaxGreaterThanMin(min, max) {
    const diff = removeUnits(breakpoints[max]) - removeUnits(breakpoints[min]);

    invariant(diff >= 0, 'The `max` value cannot be less than the `min`.');
  }
}

function removeUnits(value) {
  return parseInt(value, 10);
}
