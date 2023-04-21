const {
  createBreakpoints,
  DEFAULT_BREAKPOINTS,
  ERROR_PREFIX,
  calcMaxWidth,
} = require('./breakpoints');

describe('createBreakpoints', () => {
  let breakpoints = null;
  let INVALID_BREAKPOINT_NAME = null;

  beforeEach(() => {
    breakpoints = createBreakpoints();
    INVALID_BREAKPOINT_NAME = 'invalid';
  });

  it('should returns an object with expected methods', () => {
    expect(Object.keys(breakpoints)).toEqual(['up', 'down', 'between', 'only']);
    expect(typeof breakpoints.up).toBe('function');
    expect(typeof breakpoints.down).toBe('function');
    expect(typeof breakpoints.between).toBe('function');
    expect(typeof breakpoints.only).toBe('function');
  });

  describe('up method', () => {
    it('should throw an error for an invalid breakpoint name', () => {
      expect(() => breakpoints.up(INVALID_BREAKPOINT_NAME)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw an error when the value is 0', () => {
      expect(() => breakpoints.up('xs')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );
    });

    it('should return the correct value for valid breakpoint', () => {
      expect(breakpoints.up('sm')).toBe(DEFAULT_BREAKPOINTS.sm);
      expect(breakpoints.up('md')).toBe(DEFAULT_BREAKPOINTS.md);
      expect(breakpoints.up('lg')).toBe(DEFAULT_BREAKPOINTS.lg);
      expect(breakpoints.up('xl')).toBe(DEFAULT_BREAKPOINTS.xl);
      expect(breakpoints.up('xxl')).toBe(DEFAULT_BREAKPOINTS.xxl);
    });
  });

  describe('down method', () => {
    it('should throw an error for an invalid breakpoint name', () => {
      expect(() => breakpoints.down(INVALID_BREAKPOINT_NAME)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw an error when the value is 0', () => {
      expect(() => breakpoints.down('xs')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );
    });

    it('should calculate the correct maximum breakpoint width', () => {
      expect(breakpoints.down('sm')).toBe(calcMaxWidth(DEFAULT_BREAKPOINTS.sm));
      expect(breakpoints.down('md')).toBe(calcMaxWidth(DEFAULT_BREAKPOINTS.md));
      expect(breakpoints.down('lg')).toBe(calcMaxWidth(DEFAULT_BREAKPOINTS.lg));
      expect(breakpoints.down('xl')).toBe(calcMaxWidth(DEFAULT_BREAKPOINTS.xl));
      expect(breakpoints.down('xxl')).toBe(
        calcMaxWidth(DEFAULT_BREAKPOINTS.xxl)
      );
    });
  });

  describe('between method', () => {
    it('should throw an error for an invalid breakpoint names', () => {
      expect(() =>
        breakpoints.between(INVALID_BREAKPOINT_NAME, 'sm')
      ).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );

      expect(() =>
        breakpoints.between('sm', INVALID_BREAKPOINT_NAME)
      ).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw an error when the value is 0', () => {
      expect(() => breakpoints.between('xs', 'sm')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );

      expect(() => breakpoints.between('sm', 'xs')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );
    });

    it('should calculate the correct breakpoint range', () => {
      expect(breakpoints.between('sm', 'md')).toEqual({
        min: DEFAULT_BREAKPOINTS.sm,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      expect(breakpoints.between('md', 'lg')).toEqual({
        min: DEFAULT_BREAKPOINTS.md,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.lg),
      });

      expect(breakpoints.between('lg', 'xl')).toEqual({
        min: DEFAULT_BREAKPOINTS.lg,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xl),
      });

      expect(breakpoints.between('xl', 'xxl')).toEqual({
        min: DEFAULT_BREAKPOINTS.xl,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xxl),
      });
    });
  });

  describe('only method', () => {
    it('should throw an error for an invalid breakpoint name', () => {
      expect(() => breakpoints.only(INVALID_BREAKPOINT_NAME)).toThrowError(
        `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_NAME}\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw an error when the value is 0', () => {
      expect(() => breakpoints.only('xs')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );
    });

    it('should throw an error when given the last breakpoint name', () => {
      const LAST_BREAKPOINT_NAME = 'xxl';

      expect(() => {
        breakpoints.only(LAST_BREAKPOINT_NAME);
      }).toThrow(
        `${ERROR_PREFIX}\`${LAST_BREAKPOINT_NAME}\` doesn't have a maximum width. Use \`xl\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
      );
    });

    it('should return correct min and max values for given breakpoint name', () => {
      expect(breakpoints.only('sm')).toEqual({
        min: DEFAULT_BREAKPOINTS.sm,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      expect(breakpoints.only('md')).toEqual({
        min: DEFAULT_BREAKPOINTS.md,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.lg),
      });

      expect(breakpoints.only('lg')).toEqual({
        min: DEFAULT_BREAKPOINTS.lg,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xl),
      });

      expect(breakpoints.only('xl')).toEqual({
        min: DEFAULT_BREAKPOINTS.xl,
        max: calcMaxWidth(DEFAULT_BREAKPOINTS.xxl),
      });
    });
  });
});
