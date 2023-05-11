exports.memoize = (fn, map = new Map()) => {
  return (...args) => {
    const key = JSON.stringify(args);

    if (!map.has(key)) {
      map.set(key, fn(...args));
    }

    return map.get(key);
  };
};
