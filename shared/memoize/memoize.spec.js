import { describe, it, expect, vi } from 'vitest';
import { memoize } from './memoize';

describe('memoize', () => {
  describe('basic functionality', () => {
    it('returns a memoized function', () => {
      // Act
      const memoized = memoize(() => {});

      // Assert
      expect(typeof memoized).toBe('function');
    });
  });

  describe('caching behavior', () => {
    it('caches the result for the same arguments', () => {
      // Arrange
      const fn = vi.fn((a, b) => a + b);
      const memoized = memoize(fn);

      // Act and Assert
      expect(memoized(1, 2)).toBe(3);
      expect(memoized(1, 2)).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('caches the result for different arguments', () => {
      // Arrange
      const fn = vi.fn((a, b, c) => a + b + c);

      // Act
      const memoized = memoize(fn);

      // Assert
      expect(memoized(1, 2, 3)).toBe(6);
      expect(memoized(2, 3, 4)).toBe(9);
      expect(fn).toHaveBeenCalledTimes(2);

      expect(memoized(1, 2, 3)).toBe(6);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('argument types', () => {
    it('works with different types of arguments', () => {
      // Arrange
      const fn = vi.fn((a, b, c) => a + b.length + c);

      // Act
      const memoized = memoize(fn);

      // Assert
      expect(memoized(1, 'foo', true)).toBe(5);
      expect(memoized(1, 'foo', true)).toBe(5);
      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoized(1, 'foobar', true)).toBe(8);
      expect(memoized(1, 'foo', true)).toBe(5);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('works with objects and arrays', () => {
      // Arrange
      const fn = vi.fn((a, b, c) => a.x + b.length + c[0]);

      // Act
      const memoized = memoize(fn);

      // Assert
      expect(memoized({ x: 1 }, 'foo', [true])).toBe(5);
      expect(memoized({ x: 1 }, 'foo', [true])).toBe(5);
      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoized({ x: 2 }, 'foobar', [false])).toBe(8);
      expect(memoized({ x: 1 }, 'foo', [true])).toBe(5);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('error handling', () => {
    it('does not cache errors', () => {
      // Arrange
      const fn = vi.fn(() => {
        throw new Error();
      });

      // Act
      const memoized = memoize(fn);

      // Assert
      expect(() => memoized(1)).toThrow();
      expect(() => memoized(1)).toThrow();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
