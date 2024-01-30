import { describe, beforeAll, vi, it, expect } from 'vitest';

describe('withOrientation', () => {
  let withOrientation = null;

  // Arrange
  beforeAll(() => {
    vi.resetModules();
    process.env.NODE_ENV = 'production';

    withOrientation = require('.').withOrientation;
  });

  describe('production environment', () => {
    // Arrange
    const mediaQuery = '(min-width: 768px)';

    it.each(['landscape', 'portrait'])(
      'returns a media query with orientation for %s',
      (orientation) => {
        // Act
        const received = withOrientation({
          mediaQuery,
          orientation,
        });

        // Assert
        expect(received).toBe(
          `${mediaQuery} and (orientation: ${orientation})`
        );
      }
    );
  });
});
