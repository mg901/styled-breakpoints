exports.createBreakpoints = ({ breakpoints } = {}) => {
  const keys = Object.keys(Object(breakpoints));

  const up = (min) => breakpoints[min];

  const down = (max) => calcMaxWidth(breakpoints[max]);

  const between = (min, max) => ({
    min: up(min),
    max: down(max),
  });

  const only = (key) => {
    const nextName = keys.indexOf(key) + 1;

    return nextName < keys.length ? between(key, keys[nextName]) : up(key);
  };

  return {
    up,
    down,
    between,
    only,
  };
};

// Maximum breakpoint width. Null for the largest (last) breakpoint.
// The maximum value is calculated as the minimum of the next one less 0.02px
// to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
// See https://bugs.webkit.org/show_bug.cgi?id=178261
function calcMaxWidth(value) {
  return `${parseInt(value, 10) - 0.02}px`;
}

exports.calcMaxWidth = calcMaxWidth;
