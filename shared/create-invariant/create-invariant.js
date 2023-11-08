/**
 * Creates an invariant function that raises an error when a condition is not met.
 *
 * @param {string} errorPrefix - The prefix to add to the error message.
 * @returns {Function} - An invariant function.
 */
exports.createInvariant =
  (errorPrefix = '[prefix]: ') =>
  /**
   * Throws an error if the provided condition is false.
   *
   * @param {boolean} condition - The condition to check.
   * @param {string} message - The error message to display if the condition is false.
   */
  (condition, message = 'Invariant failed') => {
    if (!condition) {
      throw new Error(errorPrefix + message);
    }
  };
