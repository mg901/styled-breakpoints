const { createBreakpoints: createBreakpointsApi } = require('./breakpoints');

exports.createBreakpoints = ({ breakpoints, errorPrefix }) => {
  const invariant = createInvariantWithPrefix(errorPrefix);
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
    entries: Object.entries(Object(breakpoints)),
    invariant,
    up,
    down,
    between,
    only,
  };
};

function createInvariantWithPrefix(errorPrefix = '[prefix]: ') {
  return function (condition, message = 'Invariant failed') {
    if (!condition) {
      throw new Error(errorPrefix + message);
    }
  };
}

exports.createInvariantWithPrefix = createInvariantWithPrefix;

function createValidation({ invariant, breakpoints }) {
  const names = Object.keys(Object(breakpoints));

  const throwIfInvalidBreakpoints = () => {
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
  };

  const throwIsInvalidName = (name) => {
    invariant(
      breakpoints[name],
      `breakpoint \`${name}\` not found in ${names.join(', ')}.`
    );
  };

  const throwIsValueIsZero = (name) => {
    const value = breakpoints[name];

    invariant(
      removeUnits(value) !== 0,
      `\`${name}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  };

  const throwIsMaxValueLessThanMin = (min, max) => {
    invariant(
      removeUnits(breakpoints[max]) - removeUnits(breakpoints[min]) > 0,
      'The `max` value cannot be less than the `min`.'
    );
  };

  return {
    throwIfInvalidBreakpoints,
    throwIsInvalidName,
    throwIsValueIsZero,
    throwIsMaxValueLessThanMin,
  };
}

exports.createValidation = createValidation;

function removeUnits(value) {
  return parseInt(value, 10);
}
