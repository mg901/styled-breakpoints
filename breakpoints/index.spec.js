describe('createBreakpoints production', () => {
  let DEFAULT_BREAKPOINTS = null;
  let breakpointsApi = null;
  let keys = null;

  beforeEach(() => {
    process.env.NODE_ENV = 'production';
    const bp = require('.');

    DEFAULT_BREAKPOINTS = {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    };

    breakpointsApi = bp.createBreakpoints({
      breakpoints: DEFAULT_BREAKPOINTS,
    });

    keys = Object.keys(DEFAULT_BREAKPOINTS);
  });

  it('should returns an object with expected methods', () => {
    expect(Object.keys(breakpointsApi)).toEqual([
      'up',
      'down',
      'between',
      'only',
    ]);

    expect(typeof breakpointsApi.up).toBe('function');
    expect(typeof breakpointsApi.down).toBe('function');
    expect(typeof breakpointsApi.between).toBe('function');
    expect(typeof breakpointsApi.only).toBe('function');
  });

  describe('up method', () => {
    it('should return the correct value for valid breakpoint', () => {
      keys.forEach((key) => {
        expect(breakpointsApi.up(key)).toBe(DEFAULT_BREAKPOINTS[key]);
      });
    });
  });

  describe('down method', () => {
    it('should calculate the correct maximum breakpoint width', () => {
      const { calcMaxWidth } = require('.');

      keys.slice(1).forEach((key) => {
        expect(breakpointsApi.down(key)).toBe(
          calcMaxWidth(DEFAULT_BREAKPOINTS[key])
        );
      });
    });
  });

  describe('between method', () => {
    it('should calculate the correct breakpoint range', () => {
      const { calcMaxWidth } = require('.');

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

  describe('only method', () => {
    it('should return correct min and max values for given breakpoint name', () => {
      const { calcMaxWidth } = require('.');

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
describe('createBreakpoints development', () => {
  let breakpointsApi = null;
  let INVALID_BREAKPOINT_NAME = null;
  let ERROR_PREFIX = null;
  let DEFAULT_BREAKPOINTS = null;

  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'development';

    const bp = require('.');
    breakpointsApi = bp.createBreakpoints({
      breakpoints: DEFAULT_BREAKPOINTS,
      errorPrefix: ERROR_PREFIX,
    });

    INVALID_BREAKPOINT_NAME = 'invalid';
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
    const { createBreakpoints } = require('.');

    expect(() =>
      createBreakpoints({
        breakpoints: DEFAULT_BREAKPOINTS,
        errorPrefix: ERROR_PREFIX,
      })
    ).not.toThrowError();
  });

  it('should throw an error if invalid breakpoints are found', () => {
    const { createBreakpoints } = require('.');

    expect(() =>
      createBreakpoints({
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

  it('should returns an object with expected methods', () => {
    expect(Object.keys(breakpointsApi)).toEqual([
      'entries',
      'invariant',
      'up',
      'down',
      'between',
      'only',
    ]);

    expect(Array.isArray(breakpointsApi.entries)).toBeTruthy();
    expect(typeof breakpointsApi.invariant).toBe('function');

    expect(typeof breakpointsApi.up).toBe('function');
    expect(typeof breakpointsApi.down).toBe('function');
    expect(typeof breakpointsApi.between).toBe('function');
    expect(typeof breakpointsApi.only).toBe('function');
  });

  describe('up method', () => {
    it('should throw an error for an invalid breakpoint name', () => {
      expect(() => breakpointsApi.up(INVALID_BREAKPOINT_NAME)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });
  });

  describe('down method', () => {
    it('should throw an error for an invalid breakpoint name', () => {
      expect(() => breakpointsApi.down(INVALID_BREAKPOINT_NAME)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw an error when the value is equal 0', () => {
      expect(() => breakpointsApi.down('xs')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );
    });
  });

  describe('between method', () => {
    it('should throw an error for invalid breakpoint names', () => {
      expect(() =>
        breakpointsApi.between(INVALID_BREAKPOINT_NAME, 'sm')
      ).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );

      expect(() =>
        breakpointsApi.between('sm', INVALID_BREAKPOINT_NAME)
      ).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
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
    it('should throw an error for an invalid breakpoint name', () => {
      expect(() => breakpointsApi.only(INVALID_BREAKPOINT_NAME)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });
  });
});
