const { calcMaxWidth } = require('./calc-max-width');

exports.createBreakpointsApi = ({ breakpoints = {} }) => {
  const indexMap = {};
  const keys = Object.keys(breakpoints);

  keys.forEach((key, index) => {
    indexMap[key] = index;
  });

  const up = (min) => breakpoints[min];
  const down = (max) => calcMaxWidth(breakpoints[max]);

  const getNextKey = (key) => {
    const currentIndex = indexMap[key];
    const nextIndex = currentIndex + 1;
    const isNotLastIndex = currentIndex < keys.length - 1;

    return isNotLastIndex ? keys[nextIndex] : undefined;
  };

  const between = (min, max) => ({
    min: up(min),
    max: down(max),
  });

  const only = (key) =>
    key !== keys.at(-1) ? between(key, getNextKey(key)) : up(key);

  return {
    keys,
    getNextKey,
    up,
    down,
    between,
    only,
  };
};
