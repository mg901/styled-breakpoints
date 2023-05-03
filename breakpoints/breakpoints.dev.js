const { createBreakpoints: createBreakpointsApi } = require('./breakpoints');

exports.createBreakpoints = ({ breakpoints, errorPrefix } = {}) => {
  const invariant = createInvariantWithPrefix(errorPrefix);
  const validation = makeBreakpointsValidation({
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

function makeBreakpointsValidation({ breakpoints, invariant } = {}) {
  const names = Object.keys(Object(breakpoints));

  const throwIfInvalidBreakpoints = () => {
    const invalidBreakpoints = names.reduce((acc, name) => {
      if (!/^\d+px$/.test(breakpoints[name])) {
        acc += `${name}: ${breakpoints[name]}, `;
      }

      return acc;
    }, '');

    invariant(
      invalidBreakpoints.length === 0,
      `Check your theme. \`${invalidBreakpoints.trimEnd()}\` are invalid breakpoints. Use only pixels.`
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

  const throwIsLastBreakpoint = (name) => {
    invariant(
      name !== names.at(-1),
      `\`${name}\` doesn't have a maximum width. Use \`${names.at(
        -2
      )}\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
    );
  };

  return {
    throwIfInvalidBreakpoints,
    throwIsInvalidName,
    throwIsValueIsZero,
    throwIsMaxValueLessThanMin,
    throwIsLastBreakpoint,
  };
}

function removeUnits(value) {
  return parseInt(value, 10);
}
