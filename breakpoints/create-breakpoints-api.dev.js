const { createBreakpointsApi } = require('./create-breakpoints-api.prod');
const { createInvariant } = require('./create-invariant');

exports.createBreakpointsApi = ({ breakpoints, errorPrefix }) => {
  const invariant = createInvariant(errorPrefix);
  const validation = createValidation({
    invariant,
    breakpoints,
  });

  validation.throwIfInvalidBreakpoints();
  const breakpointsApi = createBreakpointsApi({
    breakpoints,
  });

  const up = (min) => {
    validation.throwIsInvalidName(min);

    return breakpointsApi.up(min);
  };

  const down = (max) => {
    validation.throwIsInvalidName(max);
    validation.throwIsValueIsZero(max);

    return breakpointsApi.down(max);
  };

  const between = (min, max) => {
    validation.throwIsInvalidName(min);
    validation.throwIsInvalidName(max);
    validation.throwIsMaxValueLessThanMin(min, max);

    return breakpointsApi.between(min, max);
  };

  const only = (name) => {
    validation.throwIsInvalidName(name);

    return breakpointsApi.only(name);
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
  const names = Object.keys(Object(breakpoints));

  return {
    throwIfInvalidBreakpoints,
    throwIsInvalidName,
    throwIsValueIsZero,
    throwIsMaxValueLessThanMin,
  };

  function throwIfInvalidBreakpoints() {
    const invalidBreakpoints = names.reduce((acc, name) => {
      if (!/^\d+px$/.test(breakpoints[name].trim())) {
        acc.push(`${name}: ${breakpoints[name]}`);
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

  function throwIsInvalidName(name) {
    invariant(
      breakpoints[name],
      `breakpoint \`${name}\` not found in ${names.join(', ')}.`
    );
  }

  function throwIsValueIsZero(name) {
    const value = breakpoints[name];

    invariant(
      removeUnits(value) !== 0,
      `\`${name}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  }

  function throwIsMaxValueLessThanMin(min, max) {
    const diff = removeUnits(breakpoints[max]) - removeUnits(breakpoints[min]);

    invariant(diff >= 0, 'The `max` value cannot be less than the `min`.');
  }
}

function removeUnits(value) {
  return parseInt(value, 10);
}
