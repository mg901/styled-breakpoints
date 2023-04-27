const { createInvariantWithPrefix } = require('../library');

exports.createBreakpoints = ({ breakpoints, errorPrefix } = {}) => {
  const invariant = createInvariantWithPrefix(errorPrefix);
  const validation = makeBreakpointsValidation({
    invariant,
    breakpoints,
  });

  validation.throwIfInvalidBreakpoints();
  const names = Object.keys(Object(breakpoints));

  const up = (min) => {
    validation.throwIsInvalidName(min);

    return breakpoints[min];
  };

  const down = (max) => {
    validation.throwIsInvalidName(max);
    validation.throwIsValueIsZero(max);

    return calcMaxWidth(breakpoints[max]);
  };

  const between = (min, max) => {
    validation.throwIsInvalidName(min);
    validation.throwIsInvalidName(max);

    const calcMax = () => {
      validation.throwIsMaxValueLessThanMin(min, max);

      return calcMaxWidth(breakpoints[max]);
    };

    return {
      min: up(min),
      max: calcMax(),
    };
  };

  const only = (name) => {
    const nextIndex = names.indexOf(name) + 1;
    const values = Object.values(Object(breakpoints));

    const calcMax = () => {
      validation.throwIsLastBreakpoint(name);

      return calcMaxWidth(values[nextIndex]);
    };

    return {
      min: up(name),
      max: calcMax(),
    };
  };

  return {
    names,
    entries: Object.entries(Object(breakpoints)),
    invariant,
    up,
    down,
    between,
    only,
  };
};

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

// Maximum breakpoint width. Null for the largest (last) breakpoint.
// The maximum value is calculated as the minimum of the next one less 0.02px
// to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
// See https://bugs.webkit.org/show_bug.cgi?id=178261
function calcMaxWidth(value) {
  return `${removeUnits(value) - 0.02}px`;
}

function removeUnits(value) {
  return parseInt(value, 10);
}

exports.calcMaxWidth = calcMaxWidth;
