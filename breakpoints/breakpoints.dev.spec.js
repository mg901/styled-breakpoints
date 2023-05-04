const {
  createInvariantWithPrefix,
  createValidation,
  createBreakpoints,
} = require('./breakpoints.dev');

describe('createInvariantWithPrefix function', () => {
  let invariant = null;

  beforeEach(() => {
    invariant = createInvariantWithPrefix();
  });

  it('should throw an error with the default error prefix if the condition is false', () => {
    expect(() => invariant(false)).toThrowError('[prefix]: Invariant failed');
  });

  it('should throw an error with the specified error prefix if the condition is false', () => {
    const CUSTOM_PREFIX = 'Custom prefix: ';
    const invariantWithCustomPrefix = createInvariantWithPrefix(CUSTOM_PREFIX);

    expect(() => invariantWithCustomPrefix(false)).toThrowError(
      `${CUSTOM_PREFIX}Invariant failed`
    );
  });

  it('should not throw if the condition is truthy', () => {
    const truthy = [1, -1, true, {}, [], Symbol('test'), 'hi'];

    truthy.forEach((value) => expect(() => invariant(value)).not.toThrow());
  });

  it('should throw if the condition is falsy', () => {
    const falsy = [undefined, null, false, +0, -0, NaN, ''];

    falsy.forEach((value) => expect(() => invariant(value)).toThrow());
  });
});

describe('createValidation', () => {
  let ERROR_PREFIX = null;
  let invariant = null;

  beforeEach(() => {
    ERROR_PREFIX = '[breakpoints]: ';
    invariant = createInvariantWithPrefix(ERROR_PREFIX);
  });

  it('should throw an error if invalid breakpoints are found', () => {
    const validation = createValidation({
      invariant,
      breakpoints: {
        xs: '0px',
        sm: '576px',
        md: 'wtf',
        lg: '992',
        xl: 'px1200',
        xxl: '1400px',
      },
    });

    expect(() => validation.throwIfInvalidBreakpoints()).toThrowError(
      `${ERROR_PREFIX}The following breakpoints are invalid: \`md: wtf, lg: 992, xl: px1200\`. Use values with pixel units (e.g., '200px').`
    );
  });

  it('should not throw an error if all breakpoints are valid', () => {
    const validation = createValidation({
      invariant,
      breakpoints: {
        xs: '0px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1400px',
      },
    });

    expect(() => validation.throwIfInvalidBreakpoints()).not.toThrowError();
  });
});

describe('core/createBreakpoints', () => {
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
    // it('should return the correct value for valid breakpoint', () => {
    //   keys.forEach((key) => {
    //     expect(breakpointsApi.up(key)).toBe(DEFAULT_BREAKPOINTS[key]);
    //   });
    // });
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
