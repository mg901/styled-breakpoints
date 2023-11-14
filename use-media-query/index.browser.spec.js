/**
 * @jest-environment jsdom
 */

const { renderHook } = require('@testing-library/react');
const { useMediaQuery } = require('./use-media-query');

describe('useMediaQuery', () => {
  // Arrange
  const matches = {
    '(min-width: 500px)': true,
    '(min-width: 1000px)': false,
  };

  describe('In Safari Browser less than v14', () => {
    // Arrange
    beforeEach(() => {
      window.matchMedia = jest.fn((query) => ({
        matches: matches[query] || false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));
    });

    test('returns true if media query matches', () => {
      // Act
      const { result } = renderHook(() => useMediaQuery('(min-width: 500px)'));

      // Assert
      expect(result.current).toBe(true);
    });

    test('returns false if media query does not match', () => {
      // Act
      const { result } = renderHook(() => useMediaQuery('(min-width: 1200px)'));

      // Assert
      expect(result.current).toBe(false);
    });

    test('updates when media query changes', () => {
      // Act
      const { result, rerender } = renderHook(
        ({ query }) => useMediaQuery(query),
        { initialProps: { query: '(min-width: 500px)' } }
      );

      // Assert
      expect(result.current).toBe(true);

      // Act
      rerender({ query: '(max-width: 800px)' });

      // Assert
      expect(result.current).toBe(false);
    });
  });

  describe('In other browsers', () => {
    // Arrange
    beforeEach(() => {
      window.matchMedia = jest.fn((query) => ({
        matches: matches[query] || false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));
    });

    test('returns true if media query matches', () => {
      // Act
      const { result } = renderHook(() => useMediaQuery('(min-width: 500px)'));

      // Assert
      expect(result.current).toBe(true);
    });

    test('returns false if media query does not match', () => {
      // Act
      const { result } = renderHook(() => useMediaQuery('(min-width: 1200px)'));

      // Assert
      expect(result.current).toBe(false);
    });

    test('updates when media query changes', () => {
      // Act
      const { result, rerender } = renderHook(
        ({ query }) => useMediaQuery(query),
        { initialProps: { query: '(min-width: 500px)' } }
      );

      // Assert
      expect(result.current).toBe(true);

      // Act
      rerender({ query: '(max-width: 800px)' });

      // Assert
      expect(result.current).toBe(false);
    });
  });
});
