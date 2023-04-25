const { createBreakpoints } = require('./breakpoints');

const { down, between, only } = createBreakpoints();

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

  describe('down', () => {
    it('should throw exception if the breakpoint name is not found', () => {
      try {
        down('wtf');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
        );
      }
    });

    it('should render correctly breakpoints by default', () => {
      const results = [
        ['sm', '575.98px'],
        ['md', '767.98px'],
        ['lg', '991.98px'],
        ['xl', '1199.98px'],
        ['xxl', '1399.98px'],
      ];

      results.forEach(([key, value]) => {
        expect(down(key)).toEqual(value);
      });
    });

    it('should throw exception if the last breakpoint is specified as the maximum value', () => {
      try {
        down('xxl');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xxl\` doesn't have a maximum width. Use \`xl\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
        );
      }
    });
  });

  describe('between', () => {
    it('should throw exception if the breakpoint name is not found', () => {
      try {
        between('wtf', 'md');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
        );
      }
    });

    it('should throw exception if the breakpoint value is zero ', () => {
      try {
        between('xs', 'sm');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
        );
      }
    });

    it('return an object with the minimum and maximum screen width', () => {
      expect(between('md', 'xl')).toEqual({
        max: '1199.98px',
        min: '768px',
      });
    });

    it('should throw exception if the last breakpoint is specified as the maximum value', () => {
      try {
        between('xl', 'xxl');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xxl\` doesn't have a maximum width. Use \`xl\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
        );
      }
    });
  });

  describe('only', () => {
    it('should throw exception if the breakpoint name is not found', () => {
      try {
        only('wtf');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
        );
      }
    });

    it('return an object with the minimum and maximum screen width', () => {
      expect(only('md')).toEqual({
        max: '991.98px',
        min: '768px',
      });
    });

    it('should throw exception if the last breakpoint is specified as the maximum value', () => {
      try {
        only('xxl');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xxl\` doesn't have a maximum width. Use \`xl\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
        );
      }
    });
  });
});
