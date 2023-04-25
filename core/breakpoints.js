const { createInvariantWithPrefix } = require('../library');

exports.createBreakpoints = ({ breakpoints, errorPrefix } = {}) => {
  const names = Object.keys(Object(breakpoints));
  const values = Object.values(Object(breakpoints));
  const entries = Object.entries(Object(breakpoints));
  const invariant = createInvariantWithPrefix(errorPrefix);

  const validation = makeBreakpointsValidation({
    invariant,
    breakpoints,
    names,
  });

  return {
    names,
    entries,
    invariant,
    ...withBreakpoints({
      validation,
      breakpoints,
      names,
      values,
    }),
  };
};

function makeBreakpointsValidation(state) {
  return {
    throwIsInvalidName,
    throwIsValueIsZero,
    throwIsLastBreakpoint,
  };

  function throwIsInvalidName(name) {
    state.invariant(
      state.breakpoints[name],
      `breakpoint \`${name}\` not found in ${state.names.join(', ')}.`
    );
  }

  function throwIsValueIsZero(name) {
    const value = state.breakpoints[name];
    const isNotZero = parseFloat(value) !== 0;

    state.invariant(
      isNotZero,
      `\`${name}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  }

  function throwIsLastBreakpoint(name) {
    const isNotLast = name !== state.names.at(-1);
    const validName = state.names.at(-2);

    state.invariant(
      isNotLast,
      `\`${name}\` doesn't have a maximum width. Use \`${validName}\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
    );
  }
}

function withBreakpoints(state) {
  return {
    up,
    down,
    between,
    only,
  };

  function up(min) {
    state.validation.throwIsInvalidName(min);

    return state.breakpoints[min];
  }

  function down(max) {
    state.validation.throwIsInvalidName(max);
    state.validation.throwIsValueIsZero(max);
    state.validation.throwIsLastBreakpoint(max);

    return calcMaxWidth(state.breakpoints[max]);
  }

  function between(min, max) {
    state.validation.throwIsInvalidName(min);
    state.validation.throwIsInvalidName(min);

    return {
      min: up(min),
      max: calcMaxWidth(getValueByName(max)),
    };
  }

  function only(name) {
    return {
      min: getValueByName(name),
      max: calcMaxWidth(getNextValueByName(name)),
    };
  }

  function getValueByName(name) {
    state.validation.throwIsInvalidName(name);
    state.validation.throwIsValueIsZero(name);

    return state.breakpoints[name];
  }

  function getNextValueByName(name) {
    state.validation.throwIsInvalidName(name);
    state.validation.throwIsLastBreakpoint(name);

    return state.breakpoints[getNextName(name)];
  }

  function getNextName(name) {
    const nextIndex = state.names.indexOf(name) + 1;

    return state.names[nextIndex];
  }
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
