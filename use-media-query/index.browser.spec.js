// @vitest-environment jsdom

import { describe, beforeAll, beforeEach, vi, it, expect } from 'vitest';
import { configure, renderHook } from '@testing-library/react';
import { useMediaQuery } from './index';

describe('useMediaQuery hook', () => {
  // Arrange
  let matches = null;

  beforeAll(() => {
    configure({ reactStrictMode: true });

    matches = {
      '(min-width: 500px)': true,
      '(min-width: 1000px)': false,
    };
  });

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

  it('should be a function', () => {
    // Act and Assert
    expect(useMediaQuery).toBeInstanceOf(Function);
  });

  it('returns true if media query matches', () => {
    // Act
    const { result, unmount } = renderHook(() =>
      useMediaQuery('(min-width: 500px)')
    );

    // Assert
    expect(result.current).toBe(true);
    unmount();
  });

  it('returns false if media query does not match', () => {
    // Act
    const { result, unmount } = renderHook(() =>
      useMediaQuery('(min-width: 1200px)')
    );

    // Assert
    expect(result.current).toBe(false);
    unmount();
  });

  it('updates when media query changes', () => {
    // Act
    const { result, rerender, unmount } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: '(min-width: 500px)' } }
    );

    // Assert
    expect(result.current).toBe(true);

    // Act
    rerender({ query: '(max-width: 800px)' });

    // Assert
    expect(result.current).toBe(false);
    unmount();
  });
});
