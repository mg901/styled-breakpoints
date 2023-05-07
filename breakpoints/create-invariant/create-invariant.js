exports.createInvariant = (errorPrefix = '[prefix]: ') => {
  return function (condition, message = 'Invariant failed') {
    if (!condition) {
      throw new Error(errorPrefix + message);
    }
  };
};
