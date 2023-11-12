describe('withOrientation function', () => {
  let withOrientation = null;

  // Arrange
  beforeAll(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'development';

    withOrientation = require('.').withOrientation;
  });

  describe('development environment', () => {
    it('throws an error when an invalid orientation is provided', () => {
      // Arrange
      const mediaQuery = '(min-width: 768px)';
      const VALID_ORIENTATIONS = `\`landscape\` or \`portrait\``;
      const INVALID_ORIENTATION = 'invalid';
      const expected = `\`${INVALID_ORIENTATION}\` is invalid orientation. Please use ${VALID_ORIENTATIONS}`;

      const invariantMock = jest.fn((condition, message) => {
        if (!condition) throw new Error(message);
      });

      // Act
      const received = () =>
        withOrientation({
          mediaQuery,
          orientation: INVALID_ORIENTATION,
          invariant: invariantMock,
        });

      // Assert
      expect(received).toThrowError(expected);
      expect(invariantMock.mock.calls[0]).toEqual([
        false,
        `\`${INVALID_ORIENTATION}\` is invalid orientation. Please use ${VALID_ORIENTATIONS}.`,
      ]);
    });
  });
});
