const { createBreakpoints } = require('./breakpoints.dev');

describe('core/createBreakpoints', () => {
  let breakpointsApi = null;
  let INVALID_BREAKPOINT_NAME = null;
  let ERROR_PREFIX = null;
  let DEFAULT_BREAKPOINTS = null;
  let keys = null;

  beforeEach(() => {
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

    keys = Object.keys(DEFAULT_BREAKPOINTS);

    breakpointsApi = createBreakpoints({
      breakpoints: DEFAULT_BREAKPOINTS,
      errorPrefix: ERROR_PREFIX,
    });
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
    it('should return the correct value for valid breakpoint', () => {
      keys.forEach((key) => {
        expect(breakpointsApi.up(key)).toBe(DEFAULT_BREAKPOINTS[key]);
      });
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
  });

  describe('only method', () => {
    it('should throw an error for an invalid breakpoint name', () => {
      expect(() => breakpointsApi.only(INVALID_BREAKPOINT_NAME)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });
  });
});
