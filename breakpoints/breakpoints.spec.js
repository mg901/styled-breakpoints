const { createBreakpoints, calcMaxWidth } = require('./breakpoints');

describe('core/createBreakpoints', () => {
  let breakpointsApi = null;

  let DEFAULT_BREAKPOINTS = null;
  let keys = null;

  beforeEach(() => {
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
    it('should return the correct value for valid breakpoint', () => {
      keys.forEach((key) => {
        expect(breakpointsApi.up(key)).toBe(DEFAULT_BREAKPOINTS[key]);
      });
    });
  });

  describe('down method', () => {
    it('should calculate the correct maximum breakpoint width', () => {
      keys.slice(1).forEach((key) => {
        expect(breakpointsApi.down(key)).toBe(
          calcMaxWidth(DEFAULT_BREAKPOINTS[key])
        );
      });
    });
  });

  describe('between method', () => {
    it('should calculate the correct breakpoint range', () => {
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
