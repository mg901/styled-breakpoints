// @vitest-environment jsdom

import { describe, beforeEach, vi, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMediaQuery } from './use-media-query';

describe('useMediaQuery', () => {
  // Arrange
  const matches = {
    '(min-width: 500px)': true,
    '(min-width: 1000px)': false,
  };

  describe('In Safari Browser less than v14', () => {
    // Arrange
    beforeEach(() => {
      window.matchMedia = vi.fn((query) => ({
        matches: matches[query] || false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }));
    });

    it('returns true if media query matches', () => {
      // Act
      const { result } = renderHook(() => useMediaQuery('(min-width: 500px)'));

      // Assert
      expect(result.current).toBe(true);
    });

    it('returns false if media query does not match', () => {
      // Act
      const { result } = renderHook(() => useMediaQuery('(min-width: 1200px)'));

      // Assert
      expect(result.current).toBe(false);
    });

    it('updates when media query changes', () => {
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
      window.matchMedia = vi.fn((query) => ({
        matches: matches[query] || false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));
    });

    it('returns true if media query matches', () => {
      // Act
      const { result } = renderHook(() => useMediaQuery('(min-width: 500px)'));

      // Assert
      expect(result.current).toBe(true);
    });

    it('returns false if media query does not match', () => {
      // Act
      const { result } = renderHook(() => useMediaQuery('(min-width: 1200px)'));

      // Assert
      expect(result.current).toBe(false);
    });

    it('updates when media query changes', () => {
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
