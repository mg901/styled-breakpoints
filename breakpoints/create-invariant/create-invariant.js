exports.createInvariant =
  (errorPrefix = '[prefix]: ') =>
  (condition, message = 'Invariant failed') => {
    if (!condition) {
      throw new Error(errorPrefix + message);
    }
  };
