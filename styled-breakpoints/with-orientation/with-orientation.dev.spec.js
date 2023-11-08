const { withOrientation } = require('./with-orientation.dev');

describe('withOrientation function', () => {
  describe('in development', () => {
    it('should throw an error when an invalid orientation is provided', () => {
      // Arrange
      const mediaQuery = '(min-width: 768px)';
      const orientation = 'invalid';

      const invariant = (condition, message) => {
        if (!condition) throw new Error(message);
      };

      // Act
      const result = () =>
        withOrientation({
          mediaQuery,
          orientation,
          invariant,
        });

      // Assert
      expect(result).toThrowError(
        `\`${orientation}\` is invalid orientation. Use \`landscape\` or \`portrait\``
      );
    });
  });
});
