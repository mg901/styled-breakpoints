const { withOrientation } = require('./with-orientation.prod');

describe('withOrientation function', () => {
  describe('in production', () => {
    // Arrange
    const mediaQuery = '(min-width: 768px)';

    it.each(['landscape', 'portrait'])(
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
