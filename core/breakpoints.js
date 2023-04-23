const { createInvariantWithPrefix } = require('../library');

exports.createBreakpoints = ({ breakpoints, errorPrefix }) => {
  const keys = Object.keys(Object(breakpoints));
  const entries = Object.entries(Object(breakpoints));
  const invariant = createInvariantWithPrefix(errorPrefix);

  const computedBreakpoints = computeBreakpoints({
    breakpoints,
    entries,
    keys,
  });

  const validation = withValidation({
    invariant,
    breakpoints,
    computedBreakpoints,
    keys,
  });

  return {
    keys,
    entries,
    invariant,
    ...withBreakpoints({
      invariant,
      validation,
      computedBreakpoints,
    }),
  };
};

function withBreakpoints(state) {
  return {
    invariant: state.invariant,
    up: (name) => {
      state.validation.validateBreakpoint(name);

      return state.computedBreakpoints[name].up;
    },

    down: (name) => {
      state.validation.validateBreakpoint(name);

      return state.computedBreakpoints[name].down;
    },

    between: (min, max) => {
      state.validation.validateBreakpoint(min);
      state.validation.validateBreakpoint(max);

      return {
        min: state.computedBreakpoints[min].up,
        max: state.computedBreakpoints[max].down,
      };
    },
    only: (name) => {
      state.validation.throwIsInvalidName(name);
      state.validation.throwIsLastBreakpointName(name);

      return {
        min: state.computedBreakpoints[name].up,
        max: state.computedBreakpoints[name].end,
      };
    },
  };
}

function withValidation({ keys, invariant, computedBreakpoints: breakpoints }) {
  return {
    throwIsInvalidName,
    throwIsFirstBreakpointName,
    throwIsLastBreakpointName(name) {
      const isNotLast = name !== keys.at(-1);
      const validName = keys.at(-2);

      invariant(
        isNotLast,
        `\`${name}\` doesn't have a maximum width. Use \`${validName}\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
      );
    },

    validateBreakpoint(name) {
      throwIsInvalidName(name);
      throwIsFirstBreakpointName(name);
    },
  };

  function throwIsInvalidName(name) {
    invariant(
      breakpoints[name],
      `breakpoint \`${name}\` not found in ${keys.join(', ')}.`
    );
  }

  function throwIsFirstBreakpointName(name) {
    const isValid =
      typeof breakpoints[name].down === 'string' &&
      !Number.isFinite(breakpoints[name]);

    invariant(
      isValid,
      `\`${name}: ${breakpoints[name].up}\` cannot be assigned as minimum breakpoint.`
    );
  }
}

function computeBreakpoints(state) {
  return state.entries.reduce((acc, [key, value], index) => {
    if (value === '0px') {
      const nextName = state.keys[index + 1];

      acc[key] = {
        down: -Infinity,
        up: value,
        end: calcMaxWidth(state.breakpoints[nextName]),
      };
    } else if (key === state.keys.at(-1)) {
      acc[key] = {
        down: calcMaxWidth(value),
        up: value,
        end: Infinity,
      };
    } else {
      const nextName = state.keys[index + 1];

      acc[key] = {
        down: calcMaxWidth(value),
        up: value,
        end: calcMaxWidth(state.breakpoints[nextName]),
      };
    }

    return acc;
  }, {});
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
