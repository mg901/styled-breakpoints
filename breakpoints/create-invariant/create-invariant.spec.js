const { createInvariant } = require('./create-invariant');

describe('breakpoints', () => {
  describe('createInvariant function', () => {
    let invariant = null;

    // Arrange
    beforeEach(() => {
      invariant = createInvariant();
    });

    it('should throw an error with the default error prefix if the condition is false', () => {
      // Act & Assert
      expect(() => invariant(false)).toThrowError('[prefix]: Invariant failed');
    });

    it('should throw an error with the specified error prefix if the condition is false', () => {
      // Arrange
      const CUSTOM_PREFIX = 'Custom prefix: ';
      const invariantWithCustomPrefix = createInvariant(CUSTOM_PREFIX);

      // Act & Assert
      expect(() => invariantWithCustomPrefix(false)).toThrowError(
        `${CUSTOM_PREFIX}Invariant failed`
      );
    });

    it.each([1, -1, true, {}, [], Symbol('test'), 'hi'])(
      'should not throw if the condition is truthy (%p)',
      (value) => {
        // Act & Assert
        expect(() => invariant(value)).not.toThrow();
      }
    );

    it.each([undefined, null, false, +0, -0, NaN, ''])(
      'should throw if the condition is falsy',
      (value) => {
        // Act & Assert
        expect(() => invariant(value)).toThrow();
      }
    );
  });
});
