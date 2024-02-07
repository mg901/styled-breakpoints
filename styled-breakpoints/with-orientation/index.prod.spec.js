import { describe, it, expect } from 'vitest';
import { withOrientation } from './index.prod';

describe('withOrientation', () => {
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
