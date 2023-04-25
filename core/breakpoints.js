const { createInvariantWithPrefix } = require('../library');

exports.createBreakpoints = ({ breakpoints, errorPrefix }) => {
  const keys = Object.keys(Object(breakpoints));
  const values = Object.values(Object(breakpoints));
  const entries = Object.entries(Object(breakpoints));
  const invariant = createInvariantWithPrefix(errorPrefix);

  const validation = withValidation({
    invariant,
    breakpoints,
    keys,
  });

  return {
    keys,
    entries,
    invariant,
    ...withBreakpoints({
      validation,
      breakpoints,
      keys,
      values,
    }),
  };
};

function withValidation({ keys, invariant, breakpoints }) {
  return {
    throwIsInvalidName,
    throwIsValueIsZero,
    throwIsLastBreakpoint,
  };

  function throwIsInvalidName(name) {
    invariant(
      breakpoints[name],
      `breakpoint \`${name}\` not found in ${keys.join(', ')}.`
    );
  }

  function throwIsValueIsZero(name) {
    const value = breakpoints[name];
    const isNotZero = parseFloat(value) !== 0;

    invariant(
      isNotZero,
      `\`${name}: ${value}\` cannot be assigned as minimum breakpoint.`
    );
  }

  function throwIsLastBreakpoint(name) {
    const isNotLast = name !== keys.at(-1);
    const validName = keys.at(-2);

    invariant(
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
    return {
      min: up(min),
      max: down(max),
    };
  }

  function only(name) {
    state.validation.throwIsInvalidName(name);
    state.validation.throwIsLastBreakpoint(name);
    const nextIndex = state.keys.indexOf(name) + 1;

    return {
      min: up(name),
      max: calcMaxWidth(state.values[nextIndex]),
    };
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
