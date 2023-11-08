const { withOrientation } = require('./with-orientation.prod');

describe('withOrientation function', () => {
  describe('in production', () => {
    // Arrange
    const testCases = [['landscape'], ['portrait']];
    const mediaQuery = '(min-width: 768px)';

    it.each(testCases)(
      'should return a media query with orientation for %s',
      (orientation) => {
        // Act
        const result = withOrientation({
          orientation,
          mediaQuery,
        });

        // Assert
        expect(result).toBe(`${mediaQuery} and (orientation: ${orientation})`);
      }
    );
  });
});
