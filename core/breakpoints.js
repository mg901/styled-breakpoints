const { createInvariantWithPrefix, memoize } = require('../library');

const DEFAULT_BREAKPOINTS = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};

const ERROR_PREFIX = '[breakpoints]: ';

const defaultOptions = {
  breakpoints: DEFAULT_BREAKPOINTS,
  errorPrefix: ERROR_PREFIX,
};

exports.DEFAULT_BREAKPOINTS = DEFAULT_BREAKPOINTS;
exports.ERROR_PREFIX = ERROR_PREFIX;

exports.createBreakpoints = ({ breakpoints, errorPrefix } = defaultOptions) => {
  const names = Object.keys(breakpoints);
  const validation = createValidation({
    names,
    breakpoints,
    errorPrefix,
  });

  const getValueByName = memoize((name) => {
    validation.checkIsValidName(name);
    validation.checkIsFirstName(name);

    return breakpoints[name];
  });

  const getNextName = (name) => {
    const nextIndex = names.indexOf(name) + 1;

    return names[nextIndex];
  };

  const getNextValueByName = memoize((name) => {
    validation.checkIsValidName(name);
    validation.checkIsLastName(name);

    return breakpoints[getNextName(name)];
  });

  // Maximum breakpoint width. Null for the largest (last) breakpoint.
  // The maximum value is calculated as the minimum of the next one less 0.02px
  // to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
  // See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
  // Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
  // See https://bugs.webkit.org/show_bug.cgi?id=178261
  const calcMaxWidth = memoize((value) => {
    return `${parseFloat(value) - 0.02}px`;
  });

  return {
    up: getValueByName,

    down: (max) => calcMaxWidth(getValueByName(max)),

    between: (min, max) => ({
      min: getValueByName(min),
      max: calcMaxWidth(getValueByName(max)),
    }),

    only: (name) => ({
      min: getValueByName(name),
      max: calcMaxWidth(getNextValueByName(name)),
    }),
  };
};

function createValidation({ names, breakpoints, errorPrefix }) {
  const invariant = createInvariantWithPrefix(errorPrefix);

  return {
    checkIsValidName: (name) => {
      invariant(
        breakpoints[name],
        `breakpoint \`${name}\` not found in ${names.join(', ')}.`
      );
    },
    checkIsFirstName: (name) => {
      const value = breakpoints[name];
      const isNotZero = parseFloat(value) !== 0;

      invariant(
        isNotZero,
        `\`${name}: ${value}\` cannot be assigned as minimum breakpoint.`
      );
    },
    checkIsLastName: (name) => {
      const currentIndex = names.indexOf(name);
      const nextIndex = currentIndex + 1;
      const isNotLast = names.length !== nextIndex;
      const validName = names[names.length - 2];

      invariant(
        isNotLast,
        `\`${name}\` doesn't have a maximum width. Use \`${validName}\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
      );
    },
  };
}
