const { DEFAULT_BREAKPOINTS } = require('../constants');

describe('breakpoints function', () => {
  let breakpointsApi = null;
  let calcMaxWidth = null;

  beforeAll(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'production';

    breakpointsApi = require('.').createBreakpointsApi({
      breakpoints: DEFAULT_BREAKPOINTS,
    });

    calcMaxWidth = require('../calc-max-width').calcMaxWidth;
  });

  describe('production environment', () => {
    it('has all the necessary methods', () => {
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
      it('returns an array of correct breakpoint keys', () => {
        // Arrange
        const expected = Object.keys(DEFAULT_BREAKPOINTS);

        // Act and Assert
        expect(breakpointsApi.keys).toEqual(expected);
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

      it.each(testCases)(
        'returns the correct next breakpoint key for %s',
        (key, value) => {
          // Act and Assert
          expect(breakpointsApi.getNextKey(key)).toBe(value);
        }
      );
    });

    describe('up method', () => {
      // Act
      it.each(Object.entries(DEFAULT_BREAKPOINTS))(
        'returns the correct minimum value for breakpoint %s',
        (key, value) => {
          // Act and Assert
          expect(breakpointsApi.up(key)).toBe(value);
        }
      );
    });

    describe('down method', () => {
      // Act
      it.each(Object.entries(DEFAULT_BREAKPOINTS))(
        'calculates the correct maximum value for breakpoint %s',
        (key, value) => {
          // Act
          const received = breakpointsApi.down(key);

          // Assert
          expect(received).toBe(calcMaxWidth(value));
        }
      );
    });

    describe('between method', () => {
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
          const expected = { min, max };

          // Act and Assert
          expect(breakpointsApi.between(minKey, maxKey)).toEqual(expected);
        }
      );
    });

    describe('only method', () => {
      // Arrange
      const { xs, sm, md, lg, xl, xxl } = DEFAULT_BREAKPOINTS;

      const testCases = {
        xs: { min: xs, max: sm },
        sm: { min: sm, max: md },
        md: { min: md, max: lg },
        xl: { min: xl, max: xxl },
      };

      // Act
      it.each(Object.entries(testCases))(
        'returns correct min and max values for %s',
        (key, { min, max }) => {
          // Act and Assert
          expect(breakpointsApi.only(key)).toEqual({
            min,
            max: calcMaxWidth(max),
          });
        }
      );

      it('returns correct value for last breakpoint', () => {
        // Act and Assert
        expect(breakpointsApi.only('xxl')).toEqual(xxl);
      });
    });
  });
});
