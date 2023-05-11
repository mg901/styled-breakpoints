const { calcMaxWidth } = require('./calc-max-width');

exports.createBreakpoints = ({ breakpoints }) => {
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
