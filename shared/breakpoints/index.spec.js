describe('breakpoints', () => {
  // Arrange
  afterEach(() => {
    jest.resetModules();
  });

  const DEFAULT_BREAKPOINTS = {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  };

  describe('in production', () => {
    let breakpointsApi = null;

    // Arrange
    beforeAll(() => {
      process.env.NODE_ENV = 'production';

      breakpointsApi = require('.').createBreakpointsApi({
        breakpoints: DEFAULT_BREAKPOINTS,
      });
    });

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

  describe('in development', () => {
    // Arrange
    let breakpointsApi = null;
    let INVALID_BREAKPOINT_KEY = null;
    let ERROR_PREFIX = null;

    beforeAll(() => {
      // Arrange
      process.env.NODE_ENV = 'development';

      INVALID_BREAKPOINT_KEY = 'invalid';
      ERROR_PREFIX = '[breakpoints]: ';

      breakpointsApi = require('.').createBreakpointsApi({
        breakpoints: DEFAULT_BREAKPOINTS,
        errorPrefix: ERROR_PREFIX,
      });
    });

    it('should not throw an error if all breakpoints are valid', () => {
      const { createBreakpointsApi } = require('.');

      // Act and Assert
      expect(() =>
        createBreakpointsApi({
          breakpoints: DEFAULT_BREAKPOINTS,
          errorPrefix: ERROR_PREFIX,
        })
      ).not.toThrowError();
    });

    it('should throw an error if invalid breakpoints are found', () => {
      // Arrange
      const { createBreakpointsApi } = require('.');
      const invalidBreakpoints = {
        xs: '0px',
        sm: '576px',
        md: 'wtf',
        lg: '992',
        xl: 'px1200',
        xxl: '1400px',
      };

      // Act and Assert
      expect(() =>
        createBreakpointsApi({
          breakpoints: invalidBreakpoints,
          errorPrefix: ERROR_PREFIX,
        })
      ).toThrowError(
        `${ERROR_PREFIX}The following breakpoints are invalid: \`md: wtf, lg: 992, xl: px1200\`. Use values with pixel units (e.g., '200px').`
      );
    });

    it('should have all the necessary methods', () => {
      // Arrange
      const expectedMethods = [
        'keys',
        'invariant',
        'getNextKey',
        'up',
        'down',
        'between',
        'only',
      ];

      // Act and Assert
      expect(Object.keys(breakpointsApi)).toEqual(expectedMethods);
      expect(breakpointsApi.keys).toBeInstanceOf(Array);
      expect(breakpointsApi.invariant).toBeInstanceOf(Function);
      expect(breakpointsApi.getNextKey).toBeInstanceOf(Function);
      expect(breakpointsApi.up).toBeInstanceOf(Function);
      expect(breakpointsApi.down).toBeInstanceOf(Function);
      expect(breakpointsApi.between).toBeInstanceOf(Function);
      expect(breakpointsApi.only).toBeInstanceOf(Function);
    });

    describe('up method', () => {
      it('should throw an error for an invalid breakpoint key', () => {
        // Act and Assert
        expect(() => breakpointsApi.up(INVALID_BREAKPOINT_KEY)).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );
      });
    });

    describe('down method', () => {
      it('should throw an error for an invalid breakpoint key', () => {
        // Act and Assert
        expect(() => breakpointsApi.down(INVALID_BREAKPOINT_KEY)).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );
      });

      it('should throw an error when the value is equal 0', () => {
        // Act and Assert
        expect(() => breakpointsApi.down('xs')).toThrow(
          `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
        );
      });
    });

    describe('between method', () => {
      it('should throw an error for invalid breakpoint keys', () => {
        // Act and Assert
        expect(() =>
          breakpointsApi.between(INVALID_BREAKPOINT_KEY, 'sm')
        ).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );

        // Act and Assert
        expect(() =>
          breakpointsApi.between('sm', INVALID_BREAKPOINT_KEY)
        ).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );
      });

      it('should throw an error when the last breakpoint less than max breakpoint', () => {
        // Act and Assert
        expect(() => breakpointsApi.between('xl', 'xs')).toThrow(
          `${ERROR_PREFIX}The \`max\` value cannot be less than the \`min\`.`
        );
      });

      it('does not throw an error when max is equal to min value', () => {
        // Act and Assert
        expect(() => breakpointsApi.between('sm', 'sm')).not.toThrow(
          `${ERROR_PREFIX}The \`max\` value cannot be less than the \`min\`.`
        );
      });
    });

    describe('only method', () => {
      // Act and Assert
      it('should throw an error for an invalid breakpoint key', () => {
        expect(() => breakpointsApi.only(INVALID_BREAKPOINT_KEY)).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );
      });
    });
  });
});
