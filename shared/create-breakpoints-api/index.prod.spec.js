import { describe, beforeAll, it, expect } from 'vitest';
import { DEFAULT_BREAKPOINTS } from '../constants';
import { createBreakpointsApi } from './index.prod';

describe('createBreakpointsApi', () => {
  let breakpointsApi = null;
  let calcMaxWidth = null;

  beforeAll(() => {
    breakpointsApi = createBreakpointsApi({
      breakpoints: DEFAULT_BREAKPOINTS,
    });

    calcMaxWidth = require('../calc-max-width').calcMaxWidth;
  });

  describe('production environment', () => {
    it('has all the necessary methods', () => {
      // Arrange
      const expectedMethods = ['keys', 'getNextKey', 'up', 'down', 'between'];

      // Act and Assert
      expect(Object.keys(breakpointsApi)).toEqual(expectedMethods);
      expect(breakpointsApi.keys).toBeInstanceOf(Array);
      expect(breakpointsApi.getNextKey).toBeInstanceOf(Function);
      expect(breakpointsApi.up).toBeInstanceOf(Function);
      expect(breakpointsApi.down).toBeInstanceOf(Function);
      expect(breakpointsApi.between).toBeInstanceOf(Function);
    });

    describe('keys property', () => {
      it('returns an array of correct breakpoint keys', () => {
        // Arrange
        const expected = Object.keys(DEFAULT_BREAKPOINTS);

        // Act and Assert
        expect(breakpointsApi.keys).toEqual(expected);
      });
    });

    describe('methods', () => {
      describe('getNextKey', () => {
        it('returns the next key when the current key is not the last one', () => {
          // Act
          const received = breakpointsApi.getNextKey('sm');

          // Assert
          expect(received).toBe('md');
        });

        it('returns undefined when the current key is the last one', () => {
          // Act
          const received = breakpointsApi.getNextKey('xxl');

          // Assert
          expect(received).toBeUndefined();
        });

        it('returns undefined when the current key is not found', () => {
          // Act
          const received = breakpointsApi.getNextKey('unknown');

          // Assert
          expect(received).toBeUndefined();
        });
      });

      describe('up', () => {
        // Arrange
        const testCases = Object.entries(DEFAULT_BREAKPOINTS);

        it.each(testCases)(
          'returns the correct minimum value for breakpoint %s',
          (key, value) => {
            // Act and Assert
            expect(breakpointsApi.up(key)).toBe(value);
          }
        );
      });

      describe('down', () => {
        // Arrange
        const testCases = Object.entries(DEFAULT_BREAKPOINTS);

        it.each(testCases)(
          'calculates the correct maximum value for breakpoint %s',
          (key, value) => {
            // Act
            const received = breakpointsApi.down(key);

            // Assert
            expect(received).toBe(calcMaxWidth(value));
          }
        );
      });

      describe('between', () => {
        // Arrange
        const testCases = [
          ['xs', 'sm'],
          ['xs', 'md'],
          ['xs', 'lg'],
          ['xs', 'xl'],
          ['xs', 'xxl'],
          ['sm', 'md'],
          ['sm', 'lg'],
          ['sm', 'xl'],
          ['sm', 'xxl'],
          ['md', 'lg'],
          ['md', 'xl'],
          ['md', 'xxl'],
          ['lg', 'xl'],
          ['lg', 'xxl'],
          ['xl', 'xxl'],
        ];

        it.each(testCases)(
          'calculates the range between %s and %s',
          (minKey, maxKey) => {
            // Arrange
            const min = DEFAULT_BREAKPOINTS[minKey];
            const max = calcMaxWidth(DEFAULT_BREAKPOINTS[maxKey]);

            // Act
            const received = breakpointsApi.between(minKey, maxKey);

            // Assert
            expect(received).toEqual({ min, max });
          }
        );
      });
    });
  });
});
