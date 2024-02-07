import { describe, vi, it, expect } from 'vitest';
import { withOrientation } from './index.dev';

describe('withOrientation', () => {
  describe('development environment', () => {
    it('throws an error when an invalid orientation is provided', () => {
      // Arrange
      const mediaQuery = '(min-width: 768px)';
      const VALID_ORIENTATIONS = `\`landscape\` or \`portrait\``;
      const INVALID_ORIENTATION = 'invalid';
      const expected = `\`${INVALID_ORIENTATION}\` is invalid orientation. Please use ${VALID_ORIENTATIONS}`;

      const invariantMock = vi.fn((condition, message) => {
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
      expect(received).toThrow(expected);
      expect(invariantMock.mock.calls[0]).toEqual([
        false,
        `\`${INVALID_ORIENTATION}\` is invalid orientation. Please use ${VALID_ORIENTATIONS}.`,
      ]);
    });
  });
});
