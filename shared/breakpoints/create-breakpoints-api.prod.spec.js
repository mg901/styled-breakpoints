const { DEFAULT_BREAKPOINTS } = require('../constants');
const { createBreakpointsApi } = require('./create-breakpoints-api.prod');

describe('breakpoints function', () => {
  const breakpointsApi = createBreakpointsApi({
    breakpoints: DEFAULT_BREAKPOINTS,
  });
  describe('in production', () => {
    it('should have all the necessary methods', () => {
      // Arrange
      const expectedMethods = [
        'keys',
        'getNextKey',
        'up',
        'down',
        'between',
        'only',
      ];

      // Act and Assert
      expect(Object.keys(breakpointsApi)).toEqual(expectedMethods);
      expect(breakpointsApi.keys).toBeInstanceOf(Array);
      expect(breakpointsApi.getNextKey).toBeInstanceOf(Function);
      expect(breakpointsApi.up).toBeInstanceOf(Function);
      expect(breakpointsApi.down).toBeInstanceOf(Function);
      expect(breakpointsApi.between).toBeInstanceOf(Function);
      expect(breakpointsApi.only).toBeInstanceOf(Function);
    });

    describe('keys method', () => {
      it('should return an array of correct breakpoint keys', () => {
        // Act and Assert
        expect(breakpointsApi.keys).toEqual(Object.keys(DEFAULT_BREAKPOINTS));
      });
    });

    describe('getNextKey method', () => {
      // Arrange
      const testCases = [
        ['xs', 'sm'],
        ['sm', 'md'],
        ['md', 'lg'],
        ['lg', 'xl'],
        ['xl', 'xxl'],
        ['xxl', undefined],
      ];

      test.each(testCases)(
        'should return the correct next breakpoint key for %s',
        (currentKey, expectedNextKey) => {
          // Act and Assert
          expect(breakpointsApi.getNextKey(currentKey)).toBe(expectedNextKey);
        }
      );
    });

    describe('up method', () => {
      // Act
      it.each(Object.entries(DEFAULT_BREAKPOINTS))(
        'should return the correct minimum value for breakpoint %s',
        (breakpoint, expectedValue) => {
          // Act and Assert
          expect(breakpointsApi.up(breakpoint)).toBe(expectedValue);
        }
      );
    });

    describe('down method', () => {
      // Arrange
      const { calcMaxWidth } = require('../calc-max-width');

      // Act
      it.each(Object.entries(DEFAULT_BREAKPOINTS))(
        'should calculate the correct maximum value for breakpoint %s',
        (breakpoint, expectedWidth) => {
          // Act and Assert
          expect(breakpointsApi.down(breakpoint)).toBe(
            calcMaxWidth(expectedWidth)
          );
        }
      );
    });

    describe('between method', () => {
      // Arrange
      const { calcMaxWidth } = require('../calc-max-width');
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
        'should calculate the range between %s and %s',
        (min, max) => {
          // Act
          const expectedMin = DEFAULT_BREAKPOINTS[min];
          const expectedMax = calcMaxWidth(DEFAULT_BREAKPOINTS[max]);

          // Act and Assert
          expect(breakpointsApi.between(min, max)).toEqual({
            min: expectedMin,
            max: expectedMax,
          });
        }
      );
    });

    describe('only method', () => {
      // Arrange
      const { calcMaxWidth } = require('../calc-max-width');
      const { xs, sm, md, lg, xl, xxl } = DEFAULT_BREAKPOINTS;

      const testCases = {
        xs: { min: xs, max: sm },
        sm: { min: sm, max: md },
        md: { min: md, max: lg },
        xl: { min: xl, max: xxl },
        xxl,
      };

      // Act
      it.each(Object.entries(testCases))(
        'should return correct min and max values for %s',
        (key, { min, max }) => {
          if (key !== 'xxl') {
            // Act and Assert
            expect(breakpointsApi.only(key)).toEqual({
              min,
              max: calcMaxWidth(max),
            });
          } else {
            // Act and Assert
            expect(breakpointsApi.only(key)).toEqual(xxl);
          }
        }
      );
    });
  });
});
