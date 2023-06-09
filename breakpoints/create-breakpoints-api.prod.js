const { calcMaxWidth } = require('./calc-max-width');

exports.createBreakpointsApi = ({ breakpoints }) => {
  const keys = Object.keys(Object(breakpoints));

  const getNextKey = (key) => keys[keys.indexOf(key) + 1];

  const up = (min) => breakpoints[min];
  const down = (max) => calcMaxWidth(breakpoints[max]);

  const between = (min, max) => ({
    min: up(min),
    max: down(max),
  });

  const only = (key) =>
    key === keys.at(-1) ? up(key) : between(key, getNextKey(key));

  return {
    keys,
    getNextKey,
    up,
    down,
    between,
    only,
  };
};
