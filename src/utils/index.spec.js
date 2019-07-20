import {
  up,
  down,
  between,
  only,
  toEm,
  invariant,
  withMinMedia,
  withMaxMedia,
  withMinAndMaxMedia,
  calcMinWidth,
  calcMaxWidth,
  makeErrorMessage,
  getBreakpointValue,
  getNextBreakpointName,
  getNextBreakpointValue,
  DEFAULT_BREAKS_MAP,
  DEFAULT_BREAKS,
} from '.';

const CUSTOM_THEME = {
  theme: {
    breakpoints: {
      tablet: '768px',
      desktop: '992px',
      lgDesktop: '1200px',
    },
  },
};

const CUSTOM_THEME_IS_EMPTY = {
  theme: {},
};

describe('up', () => {
  it('should return min breakpoint value and media query', () => {
    expect(up('tablet')(CUSTOM_THEME)).toEqual('@media (min-width: 48em)');
  });

  it('should return min breakpoint value and media query (from default theme)', () => {
    expect(up('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em)',
    );
  });
  it('should return min breakpoint value and media query with portrait orientation', () => {
    expect(up('tablet', 'portrait')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (orientation: portrait)',
    );
  });

  it('should return min breakpoint value and media query with landscape orientation', () => {
    expect(up('tablet', 'landscape')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (orientation: landscape)',
    );
  });
});

describe('down', () => {
  it('should return max breakpoint value and media query', () => {
    expect(down('tablet')(CUSTOM_THEME)).toEqual(
      '@media (max-width: 61.99875em)',
    );
  });

  it('should return max breakpoint value and media query with portrait orientation', () => {
    expect(down('tablet', 'portrait')(CUSTOM_THEME)).toEqual(
      '@media (max-width: 61.99875em) and (orientation: portrait)',
    );
  });

  it('should return max breakpoint value and media query with landscape orientation', () => {
    expect(down('tablet', 'landscape')(CUSTOM_THEME)).toEqual(
      '@media (max-width: 61.99875em) and (orientation: landscape)',
    );
  });

  it('should return max breakpoint value and media query (from default theme)', () => {
    expect(down('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (max-width: 61.99875em)',
    );
  });
});

describe('between', () => {
  it('should returns a string containing the value of the minimum and maximum breakpoints and media query', () => {
    expect(between('tablet', 'desktop')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em)',
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query and portrait orientation', () => {
    expect(between('tablet', 'desktop', 'portrait')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em) and (orientation: portrait)',
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query and landscape orientation', () => {
    expect(between('tablet', 'desktop', 'landscape')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em) and (orientation: landscape)',
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query (from default theme)', () => {
    expect(between('tablet', 'desktop')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em)',
    );
  });
});

describe('only', () => {
  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query', () => {
    expect(only('tablet')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em)',
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query with portrait orientation', () => {
    expect(only('tablet', 'portrait')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em) and (orientation: portrait)',
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query with landscape orientation', () => {
    expect(only('tablet', 'landscape')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em) and (orientation: landscape)',
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query (from default theme)', () => {
    expect(only('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em)',
    );
  });
});

describe('getBreakpointValue', () => {
  it('return breakpoint value if breakpoint name is valid', () => {
    expect(getBreakpointValue('tablet', DEFAULT_BREAKS_MAP)).toEqual('768px');
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      getBreakpointValue('!!!', DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.`,
      );
    }
  });
});

describe('getNextBreakpointName', () => {
  it('return next breakpoint name if breakpoint name is valid', () => {
    expect(getNextBreakpointName('tablet')(DEFAULT_BREAKS_MAP)).toEqual(
      'desktop',
    );
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      getNextBreakpointName('!!!')(DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.`,
      );
    }
  });
});

describe('getNextBreakpointValue', () => {
  it('return next breakpoint value if breakpoint name is valid', () => {
    expect(getNextBreakpointValue('tablet', DEFAULT_BREAKS_MAP)).toEqual(
      '991.98px',
    );
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      getNextBreakpointValue('!!!', DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop'.`,
      );
    }
  });

  it('show warn if the breakpoint cannot be used ', () => {
    try {
      getNextBreakpointValue('lgDesktop', DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: Don't use 'lgDesktop' because it doesn't have a maximum width. Use 'desktop'. See https://github.com/mg901/styled-breakpoints/issues/4 .`,
      );
    }
  });
});

describe('withMinMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(withMinMedia('40em')).toEqual('@media (min-width: 40em)');
  });
});

describe('withMaxMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(withMaxMedia('40em')).toEqual('@media (max-width: 40em)');
  });
});

describe('withMinAndMaxMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(withMinAndMaxMedia('40em', '60em')).toEqual(
      '@media (min-width: 40em) and (max-width: 60em)',
    );
  });
});

describe('calcMinWidth', () => {
  it('calculate min with in pixels from default theme', () => {
    expect(calcMinWidth('desktop', DEFAULT_BREAKS)).toEqual('62em');
  });
});

describe('calcMaxWidth', () => {
  it('calculate max with in pixels from default theme', () => {
    expect(calcMaxWidth('tablet', DEFAULT_BREAKS)).toEqual('61.99875em');
  });
});

describe('errorReporter', () => {
  it('return object Error with error message', () => {
    expect(invariant).toThrow();
  });
});

describe('toEm', () => {
  it('convert values from pixels to ems', () => {
    expect(toEm('16px')).toEqual('1em');
  });
});

describe('makeErrorMessage', () => {
  it('return string with error message', () => {
    expect(makeErrorMessage('xs', DEFAULT_BREAKS_MAP)).toEqual(
      "'xs' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.",
    );
  });
});
