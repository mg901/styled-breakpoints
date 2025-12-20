// @ts-check

/**
 * @template {(...args: any[]) => any} T
 * @typedef {(...args: Parameters<T>) => ReturnType<T>} MemoizeFn
 */

/**
 * Memoizes the given function.
 *
 * @template {(...args: any[]) => any} T
 * @param {T} fn - The function to be memoized.
 * @returns {MemoizeFn<T>} The memoized function.
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
