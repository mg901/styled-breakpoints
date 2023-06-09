describe('createBreakpoints function in production', () => {
  let DEFAULT_BREAKPOINTS = null;
  let breakpointsApi = null;
  let keys = null;

  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'production';

    DEFAULT_BREAKPOINTS = {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    };

    breakpointsApi = require('.').createBreakpointsApi({
      breakpoints: DEFAULT_BREAKPOINTS,
    });

    keys = Object.keys(DEFAULT_BREAKPOINTS);
  });

  it('should have all the necessary methods', () => {
    expect(Object.keys(breakpointsApi)).toEqual([
      'keys',
      'getNextKey',
      'up',
      'down',
      'between',
      'only',
    ]);

    expect(breakpointsApi.keys).toBeInstanceOf(Array);
    expect(breakpointsApi.getNextKey).toBeInstanceOf(Function);

    expect(breakpointsApi.up).toBeInstanceOf(Function);
    expect(breakpointsApi.down).toBeInstanceOf(Function);
    expect(breakpointsApi.between).toBeInstanceOf(Function);
    expect(breakpointsApi.only).toBeInstanceOf(Function);
  });

  describe('keys', () => {
    it('should return an array of breakpoint keys', () => {
      expect(breakpointsApi.keys).toEqual(keys);
    });
  });

  describe('getNextKey', () => {
    it('should return the next breakpoint key for a given key', () => {
      expect(breakpointsApi.getNextKey('xs')).toBe('sm');
      expect(breakpointsApi.getNextKey('sm')).toBe('md');
      expect(breakpointsApi.getNextKey('md')).toBe('lg');
      expect(breakpointsApi.getNextKey('lg')).toBe('xl');
      expect(breakpointsApi.getNextKey('xl')).toBe('xxl');
      expect(breakpointsApi.getNextKey('xxl')).toBeUndefined();
    });
  });

  describe('up', () => {
    it('should return the correct value for valid breakpoint', () => {
      keys.forEach((key) => {
        expect(breakpointsApi.up(key)).toBe(DEFAULT_BREAKPOINTS[key]);
      });
    });
  });

  describe('down', () => {
    it('should calculate the correct maximum breakpoint width', () => {
      const { calcMaxWidth } = require('./calc-max-width');
      keys.slice(1).forEach((key) => {
        expect(breakpointsApi.down(key)).toBe(
          calcMaxWidth(DEFAULT_BREAKPOINTS[key])
        );
      });
    });
  });

  describe('between', () => {
    it('should calculate the correct breakpoint range', () => {
      const { calcMaxWidth } = require('./calc-max-width');

      for (let i = 0; i < keys.length - 1; i += 1) {
        for (let j = i + 1; j < keys.length; j += 1) {
          const min = keys[i];
          const max = keys[j];

          expect(breakpointsApi.between(min, max)).toEqual({
            min: DEFAULT_BREAKPOINTS[min],
            max: calcMaxWidth(DEFAULT_BREAKPOINTS[max]),
          });
        }
      }
    });
  });

  describe('only', () => {
    it('should return correct min and max values for given breakpoint key', () => {
      const { calcMaxWidth } = require('./calc-max-width');

      keys.slice(0, -1).forEach((key, index) => {
        expect(breakpointsApi.only(key)).toEqual({
          min: DEFAULT_BREAKPOINTS[key],
          max: calcMaxWidth(DEFAULT_BREAKPOINTS[keys[index + 1]]),
        });
      });

      expect(breakpointsApi.only('xxl')).toEqual(DEFAULT_BREAKPOINTS.xxl);
    });
  });
});

describe('createBreakpoints function in development', () => {
  let breakpointsApi = null;
  let INVALID_BREAKPOINT_KEY = null;
  let ERROR_PREFIX = null;
  let DEFAULT_BREAKPOINTS = null;

  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'development';

    breakpointsApi = require('.').createBreakpointsApi({
      breakpoints: DEFAULT_BREAKPOINTS,
      errorPrefix: ERROR_PREFIX,
    });

    INVALID_BREAKPOINT_KEY = 'invalid';
    ERROR_PREFIX = '[breakpoints]: ';
    DEFAULT_BREAKPOINTS = {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    };
  });

  it('should not throw an error if all breakpoints are valid', () => {
    const { createBreakpointsApi } = require('.');

    expect(() =>
      createBreakpointsApi({
        breakpoints: DEFAULT_BREAKPOINTS,
        errorPrefix: ERROR_PREFIX,
      })
    ).not.toThrowError();
  });

  it('should throw an error if invalid breakpoints are found', () => {
    const { createBreakpointsApi } = require('.');

    expect(() =>
      createBreakpointsApi({
        breakpoints: {
          xs: '0px',
          sm: '576px',
          md: 'wtf',
          lg: '992',
          xl: 'px1200',
          xxl: '1400px',
        },
        errorPrefix: ERROR_PREFIX,
      })
    ).toThrowError(
      `${ERROR_PREFIX}The following breakpoints are invalid: \`md: wtf, lg: 992, xl: px1200\`. Use values with pixel units (e.g., '200px').`
    );
  });

  it('should have all the necessary methods', () => {
    expect(Object.keys(breakpointsApi)).toEqual([
      'keys',
      'invariant',
      'getNextKey',
      'up',
      'down',
      'between',
      'only',
    ]);

    expect(breakpointsApi.keys).toBeInstanceOf(Array);
    expect(breakpointsApi.invariant).toBeInstanceOf(Function);
    expect(breakpointsApi.getNextKey).toBeInstanceOf(Function);

    expect(breakpointsApi.up).toBeInstanceOf(Function);
    expect(breakpointsApi.down).toBeInstanceOf(Function);
    expect(breakpointsApi.between).toBeInstanceOf(Function);
    expect(breakpointsApi.only).toBeInstanceOf(Function);
  });

  describe('up', () => {
    it('should throw an error for an invalid breakpoint key', () => {
      expect(() => breakpointsApi.up(INVALID_BREAKPOINT_KEY)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });
  });

  describe('down', () => {
    it('should throw an error for an invalid breakpoint key', () => {
      expect(() => breakpointsApi.down(INVALID_BREAKPOINT_KEY)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw an error when the value is equal 0', () => {
      expect(() => breakpointsApi.down('xs')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );
    });
  });

  describe('between', () => {
    it('should throw an error for invalid breakpoint keys', () => {
      expect(() =>
        breakpointsApi.between(INVALID_BREAKPOINT_KEY, 'sm')
      ).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
      );

      expect(() =>
        breakpointsApi.between('sm', INVALID_BREAKPOINT_KEY)
      ).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw an error when the last breakpoint less than max breakpoint', () => {
      expect(() => breakpointsApi.between('xl', 'xs')).toThrow(
        `${ERROR_PREFIX}The \`max\` value cannot be less than the \`min\`.`
      );
    });

    it('does not throw an error when max is equal to min value', () => {
      expect(() => breakpointsApi.between('sm', 'sm')).not.toThrow(
        `${ERROR_PREFIX}The \`max\` value cannot be less than the \`min\`.`
      );
    });
  });

  describe('only method', () => {
    it('should throw an error for an invalid breakpoint key', () => {
      expect(() => breakpointsApi.only(INVALID_BREAKPOINT_KEY)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });
  });
});
