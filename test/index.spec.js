const {
  TYPOGRAPHIST_KEY,
  PROPS_WITH_CUSTOM_THEME,
  TYPOGRAPHIST_THEME,
  CUSTOM_THEME,
  EMPTY_THEME,
  BREAKPOINTS,
  INVALID_BREAKPOINTS,
} = require('./mocks');

const { makeStyledBreakpoints } = require('../core');

const {
  invariant,
  throwInvalidBreakValue,
  throwIsInvalidBreakName,
  throwIsLastBreak,
  throwIsInvalidOrientation,
  withOrientationOrNot,
  getBreakpointsFromTheme,
  toEm,
  getNextBreakpointName,
  getNextBreakpointValue,
  getBreakpointValue,
  calcMinWidth,
  calcMaxWidth,
  up,
  down,
  between,
  only,
} = makeStyledBreakpoints();

describe('invariant', () => {
  it('throw error', () => {
    expect(invariant).toThrow();
  });
});

describe('throwInvalidBreakValue', () => {
  it('show warn if breakpoints contains values not in pixels', () => {
    try {
      throwInvalidBreakValue(INVALID_BREAKPOINTS);
      expect(true).not.equal(true);
    } catch (e) {
      expect(e.message).toEqual(
        "[styled-breakpoints]: Check your theme. '36em' is invalid breakpoint. Use pixels."
      );
    }
  });
});

describe('throwIsInvalidBreakName', () => {
  it('show warn if invalid breakpoint name', () => {
    try {
      throwIsInvalidBreakName('blabla', BREAKPOINTS);
      expect(true).not.equal(true);
    } catch (e) {
      expect(e.message).toEqual(
        "[styled-breakpoints]: 'blabla' is invalid breakpoint name. Use 'xs, sm, md, lg, xl'."
      );
    }
  });
});

describe('custom error prefix', () => {
  it('show warn if invalid breakpoint name', () => {
    const foo = makeStyledBreakpoints({
      errorPrefix: '[typographist]: ',
    });

    try {
      foo.throwIsInvalidBreakName('blabla', BREAKPOINTS);
      expect(true).not.equal(true);
    } catch (e) {
      expect(e.message).toEqual(
        "[typographist]: 'blabla' is invalid breakpoint name. Use 'xs, sm, md, lg, xl'."
      );
    }
  });
});

describe('throwIsLastBreak', () => {
  it('show warn if the breakpoint cannot be used ', () => {
    try {
      throwIsLastBreak('xl', BREAKPOINTS);
      expect(true).not.equal(true);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: Don't use 'xl' because it doesn't have a maximum width. Use 'lg'. See https://github.com/mg901/styled-breakpoints/issues/4 .`
      );
    }
  });
});

describe('throwIsInvalidOrientation', () => {
  it('show warn if invalid orientation', () => {
    try {
      throwIsInvalidOrientation('blabla');
      expect(true).not.equal(true);
    } catch (e) {
      expect(e.message).toEqual(
        "[styled-breakpoints]: 'blabla' is invalid orientation. Use 'landscape' or 'portrait'."
      );
    }
  });
});

describe('withOrientationOrNot', () => {
  it('return value without orientation', () => {
    expect(withOrientationOrNot('1rem')).toEqual('1rem');
  });

  it('return value with portrait orientation', () => {
    expect(withOrientationOrNot('1rem', 'portrait')).toEqual(
      '1rem and (orientation: portrait)'
    );
  });

  it('return value with landscape orientation', () => {
    expect(withOrientationOrNot('1rem', 'landscape')).toEqual(
      '1rem and (orientation: landscape)'
    );
  });
});

describe('toEm', () => {
  it('converts value to em', () => {
    expect(toEm('16px')).toEqual('1em');
  });
});

describe('getBreakpointsFromTheme', () => {
  it('return  breakpoints from custom theme', () => {
    expect(getBreakpointsFromTheme(CUSTOM_THEME)).toEqual({
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    });
  });

  it('return  default breakpoints', () => {
    expect(getBreakpointsFromTheme()).toEqual({
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    });
  });

  it('return media queries from the theme of typographist', () => {
    const bp = makeStyledBreakpoints({
      pathToMediaQueries: `${TYPOGRAPHIST_KEY}.mediaQueries`,
    });
    expect(bp.getBreakpointsFromTheme(TYPOGRAPHIST_THEME)).toEqual({
      desktop: '992px',
      lgDesktop: '1200px',
      tablet: '768px',
    });
  });

  describe('getNextBreakpointName', () => {
    it('return next breakpoint name', () => {
      expect(getNextBreakpointName('sm')(BREAKPOINTS)).toEqual('md');
    });
  });
});

describe('getNextBreakpointValue', () => {
  it('return next breakpoint value', () => {
    expect(getNextBreakpointValue('sm', BREAKPOINTS)).toEqual('767.98px');
  });
});

describe('getBreakpointValue', () => {
  it('return breakpoint value', () => {
    expect(getBreakpointValue('md', BREAKPOINTS)).toEqual('768px');
  });
});

describe('calcMinWidth', () => {
  it('calculate min with in pixels from default theme', () => {
    expect(calcMinWidth('sm', CUSTOM_THEME)).toEqual('36em');
  });
});

describe('calcMaxWidth', () => {
  it('calculate max with in pixels from default theme', () => {
    expect(calcMaxWidth('sm', EMPTY_THEME)).toEqual('47.99875em');
  });
});

describe('up', () => {
  it('should return min breakpoint value and media query', () => {
    expect(up('sm')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em)'
    );
  });

  it('should return min breakpoint value and media query with portrait orientation', () => {
    expect(up('sm', 'portrait')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em) and (orientation: portrait)'
    );
  });

  it('should return min breakpoint value and media query with landscape orientation', () => {
    expect(up('sm', 'landscape')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em) and (orientation: landscape)'
    );
  });
});

describe('down', () => {
  it('should return max breakpoint value and media query', () => {
    expect(down('sm')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (max-width: 47.99875em)'
    );
  });

  it('should return max breakpoint value and media query with portrait orientation', () => {
    expect(down('sm', 'portrait')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (max-width: 47.99875em) and (orientation: portrait)'
    );
  });

  it('should return max breakpoint value and media query with landscape orientation', () => {
    expect(down('sm', 'landscape')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (max-width: 47.99875em) and (orientation: landscape)'
    );
  });
});

describe('between', () => {
  it('should returns a string containing the value of the minimum and maximum breakpoints and media query', () => {
    expect(between('sm', 'md')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em) and (max-width: 61.99875em)'
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query and portrait orientation', () => {
    expect(between('sm', 'md', 'portrait')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em) and (max-width: 61.99875em) and (orientation: portrait)'
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query and landscape orientation', () => {
    expect(between('sm', 'md', 'landscape')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em) and (max-width: 61.99875em) and (orientation: landscape)'
    );
  });
});

describe('only', () => {
  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query', () => {
    expect(only('sm')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em) and (max-width: 47.99875em)'
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query with portrait orientation', () => {
    expect(only('sm', 'portrait')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em) and (max-width: 47.99875em) and (orientation: portrait)'
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query with landscape orientation', () => {
    expect(only('sm', 'landscape')(PROPS_WITH_CUSTOM_THEME)).toEqual(
      '@media (min-width: 36em) and (max-width: 47.99875em) and (orientation: landscape)'
    );
  });
});
