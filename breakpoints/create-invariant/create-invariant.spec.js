const { createInvariant } = require('./create-invariant');

describe('createInvariant function', () => {
  let invariant = null;

  beforeEach(() => {
    invariant = createInvariant();
  });

  it('should throw an error with the default error prefix if the condition is false', () => {
    expect(() => invariant(false)).toThrowError('[prefix]: Invariant failed');
  });

  it('should throw an error with the specified error prefix if the condition is false', () => {
    const CUSTOM_PREFIX = 'Custom prefix: ';
    const invariantWithCustomPrefix = createInvariant(CUSTOM_PREFIX);

    expect(() => invariantWithCustomPrefix(false)).toThrowError(
      `${CUSTOM_PREFIX}Invariant failed`
    );
  });

  it('should not throw if the condition is truthy', () => {
    const truthy = [1, -1, true, {}, [], Symbol('test'), 'hi'];

    truthy.forEach((value) => expect(() => invariant(value)).not.toThrow());
  });

  it('should throw if the condition is falsy', () => {
    const falsy = [undefined, null, false, +0, -0, NaN, ''];

    falsy.forEach((value) => expect(() => invariant(value)).toThrow());
  });
});
