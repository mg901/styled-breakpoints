/**
 * Memoizes the given function.
 * @param {Function} fn - The function to be memoized.
 * @returns {Function} - The memoized function.
 */
exports.memoize = (fn) => {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key);
  };
};
