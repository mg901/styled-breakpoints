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

  const getValueByName = (name) => {
    validation.throwIsInvalidName(name);
    validation.throwIsValueIsZero(name);

    return breakpoints[name];
  };

  const between = (min, max) => {
    validation.throwIsInvalidName(min);
    validation.throwIsInvalidName(min);

    return {
      min: up(min),
      max: calcMaxWidth(getValueByName(max)),
    };
  };

  const getNextName = (name) => {
    const nextIndex = names.indexOf(name) + 1;

    return names[nextIndex];
  };

  function getNextValueByName(name) {
    validation.throwIsInvalidName(name);
    validation.throwIsLastBreakpoint(name);

    return breakpoints[getNextName(name)];
  }

  const only = (name) => {
    return {
      min: getValueByName(name),
      max: calcMaxWidth(getNextValueByName(name)),
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

function makeBreakpointsValidation(state) {
  const names = Object.keys(Object(state.breakpoints));
  const entries = Object.entries(Object(state.breakpoints));

  const throwIfInvalidBreakpoints = () => {
    const invalidBreakpoints = entries.reduce((acc, [key, value]) => {
      if (!/^\d+px$/.test(value)) {
        acc += `${key}: ${value}, `;
      }

      return acc;
    }, '');

    state.invariant(
      invalidBreakpoints.length === 0,
      `Check your theme. \`${invalidBreakpoints.trimEnd()}\` are invalid breakpoints. Use only pixels.`
    );
  };

  const throwIsInvalidName = (name) => {
    state.invariant(
      state.breakpoints[name],
      `breakpoint \`${name}\` not found in ${names.join(', ')}.`
    );
  };

  const throwIsValueIsZero = (name) => {
    const value = state.breakpoints[name];
    const isNotZero = parseFloat(value) !== 0;

    state.invariant(
      isNotZero,
      `\`${name}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  };

  const throwIsLastBreakpoint = (name) => {
    const isNotLast = name !== names.at(-1);
    const validName = names.at(-2);

    state.invariant(
      isNotLast,
      `\`${name}\` doesn't have a maximum width. Use \`${validName}\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
    );
  };

  return {
    throwIfInvalidBreakpoints,
    throwIsInvalidName,
    throwIsValueIsZero,
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
  return `${parseFloat(value) - 0.02}px`;
}

exports.calcMaxWidth = calcMaxWidth;
