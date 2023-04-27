const { createBreakpoints, calcMaxWidth } = require('./breakpoints');

describe('core/create-breakpoints', () => {
  let breakpointsApi = null;
  let INVALID_BREAKPOINT_NAME = null;
  let ERROR_PREFIX = null;
  let DEFAULT_BREAKPOINTS = null;

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

    breakpointsApi = createBreakpoints({
      breakpoints: DEFAULT_BREAKPOINTS,
      errorPrefix: ERROR_PREFIX,
    });
  });

  it('should returns an object with expected methods', () => {
    expect(Object.keys(breakpointsApi)).toEqual([
      'names',
      'entries',
      'invariant',
      'up',
      'down',
      'between',
      'only',
    ]);

    expect(Array.isArray(breakpointsApi.names)).toBeTruthy();
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
      expect(breakpointsApi.up('xs')).toBe(DEFAULT_BREAKPOINTS.xs);
      expect(breakpointsApi.up('sm')).toBe(DEFAULT_BREAKPOINTS.sm);
      expect(breakpointsApi.up('md')).toBe(DEFAULT_BREAKPOINTS.md);
      expect(breakpointsApi.up('lg')).toBe(DEFAULT_BREAKPOINTS.lg);
      expect(breakpointsApi.up('xl')).toBe(DEFAULT_BREAKPOINTS.xl);
      expect(breakpointsApi.up('xxl')).toBe(DEFAULT_BREAKPOINTS.xxl);
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

    it('should calculate the correct maximum breakpoint width', () => {
      expect(breakpointsApi.down('sm')).toBe(
        calcMaxWidth(DEFAULT_BREAKPOINTS.sm)
      );
      expect(breakpointsApi.down('md')).toBe(
        calcMaxWidth(DEFAULT_BREAKPOINTS.md)
      );
      expect(breakpointsApi.down('lg')).toBe(
        calcMaxWidth(DEFAULT_BREAKPOINTS.lg)
      );
      expect(breakpointsApi.down('xl')).toBe(
        calcMaxWidth(DEFAULT_BREAKPOINTS.xl)
      );

      expect(breakpointsApi.down('xxl')).toBe(
        calcMaxWidth(DEFAULT_BREAKPOINTS.xxl)
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

    it('should calculate the correct breakpoint range', () => {
      // xs
      expect(breakpointsApi.between('xs', 'sm')).toEqual({
        min: DEFAULT_BREAKPOINTS.xs,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.sm),
      });

      expect(breakpointsApi.between('xs', 'md')).toEqual({
        min: DEFAULT_BREAKPOINTS.xs,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      expect(breakpointsApi.between('xs', 'lg')).toEqual({
        min: DEFAULT_BREAKPOINTS.xs,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.lg),
      });

      expect(breakpointsApi.between('xs', 'xl')).toEqual({
        min: DEFAULT_BREAKPOINTS.xs,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xl),
      });

      expect(breakpointsApi.between('xs', 'xxl')).toEqual({
        min: DEFAULT_BREAKPOINTS.xs,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xxl),
      });

      // sm
      expect(breakpointsApi.between('sm', 'md')).toEqual({
        min: DEFAULT_BREAKPOINTS.sm,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      expect(breakpointsApi.between('sm', 'lg')).toEqual({
        min: DEFAULT_BREAKPOINTS.sm,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.lg),
      });

      expect(breakpointsApi.between('sm', 'xl')).toEqual({
        min: DEFAULT_BREAKPOINTS.sm,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xl),
      });

      // md
      expect(breakpointsApi.between('md', 'lg')).toEqual({
        min: DEFAULT_BREAKPOINTS.md,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.lg),
      });

      expect(breakpointsApi.between('md', 'xl')).toEqual({
        min: DEFAULT_BREAKPOINTS.md,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xl),
      });

      expect(breakpointsApi.between('md', 'xxl')).toEqual({
        min: DEFAULT_BREAKPOINTS.md,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xxl),
      });

      // xl
      expect(breakpointsApi.between('xl', 'xxl')).toEqual({
        min: DEFAULT_BREAKPOINTS.xl,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xxl),
      });
    });

    it('should throw an error when the last breakpoint is equal 0', () => {
      expect(() => breakpointsApi.between('xl', 'xs')).toThrow(
        `${ERROR_PREFIX}The \`max\` value cannot be less than the \`min\`.`
      );
    });
  });

  describe('only', () => {
    it('should throw an error for an invalid breakpoint name', () => {
      expect(() => breakpointsApi.only(INVALID_BREAKPOINT_NAME)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should return correct min and max values for given breakpoint name', () => {
      expect(breakpointsApi.only('xs')).toEqual({
        min: DEFAULT_BREAKPOINTS.xs,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.sm),
      });

      expect(breakpointsApi.only('sm')).toEqual({
        min: DEFAULT_BREAKPOINTS.sm,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      expect(breakpointsApi.only('md')).toEqual({
        min: DEFAULT_BREAKPOINTS.md,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.lg),
      });

      expect(breakpointsApi.only('lg')).toEqual({
        min: DEFAULT_BREAKPOINTS.lg,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xl),
      });

      expect(breakpointsApi.only('xl')).toEqual({
        min: DEFAULT_BREAKPOINTS.xl,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xxl),
      });
    });

    it('should throw an error when given the last breakpoint name', () => {
      const LAST_BREAKPOINT_NAME = 'xxl';

      expect(() => {
        breakpointsApi.only(LAST_BREAKPOINT_NAME);
      }).toThrow(
        `${ERROR_PREFIX}\`${LAST_BREAKPOINT_NAME}\` doesn't have a maximum width. Use \`xl\`.`
      );
    });
  });
});
