const createInvariantWithPrefix =
  (errorPrefix = '[prefix]: ') =>
  (condition, message = 'Invariant failed') => {
    if (!condition) {
      throw new Error(errorPrefix + message);
    }
  };

const memoize = (fn, map = new Map()) => {
  return (...args) => {
    const key = JSON.stringify(args);

    if (!map.has(key)) {
      map.set(key, fn(...args));
    }

    return map.get(key);
  };
};

const get = (o, path, defaultValue) => {
  const [head, ...tail] =
    typeof path === 'string'
      ? path.replace(/\[(\d+)]/g, '.$1').split('.')
      : path;

  if (!o[head]) return defaultValue;

  return !tail.length ? o[head] : get(o[head], tail, defaultValue);
};

module.exports = {
  createInvariantWithPrefix,
  memoize,
  get,
};
