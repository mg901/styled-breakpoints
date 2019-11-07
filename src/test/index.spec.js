var sb = require('..');

var CUSTOM_THEME = {
  theme: {
    breakpoints: {
      tablet: '768px',
      desktop: '992px',
      lgDesktop: '1200px',
    },
  },
};

var CUSTOM_THEME_IS_EMPTY = {
  theme: {},
};

describe('up', () => {
  it('should return min breakpoint value and media query', () => {
    expect(sb.up('tablet')(CUSTOM_THEME)).toEqual('@media (min-width: 48em)');
  });

  it('should return min breakpoint value and media query (from default theme)', () => {
    expect(sb.up('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em)'
    );
  });
  it('should return min breakpoint value and media query with portrait orientation', () => {
    expect(sb.up('tablet', 'portrait')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (orientation: portrait)'
    );
  });

  it('should return min breakpoint value and media query with landscape orientation', () => {
    expect(sb.up('tablet', 'landscape')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (orientation: landscape)'
    );
  });
});

describe('down', () => {
  it('should return max breakpoint value and media query', () => {
    expect(sb.down('tablet')(CUSTOM_THEME)).toEqual(
      '@media (max-width: 61.99875em)'
    );
  });

  it('should return max breakpoint value and media query with portrait orientation', () => {
    expect(sb.down('tablet', 'portrait')(CUSTOM_THEME)).toEqual(
      '@media (max-width: 61.99875em) and (orientation: portrait)'
    );
  });

  it('should return max breakpoint value and media query with landscape orientation', () => {
    expect(sb.down('tablet', 'landscape')(CUSTOM_THEME)).toEqual(
      '@media (max-width: 61.99875em) and (orientation: landscape)'
    );
  });

  sb(
    'should return max breakpoint value and media query (from default theme)',
    () => {
      expect(sb.down('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
        '@media (max-width: 61.99875em)'
      );
    }
  );
});

describe('between', () => {
  it('should returns a string containing the value of the minimum and maximum breakpoints and media query', () => {
    expect(sb.between('tablet', 'desktop')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em)'
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query and portrait orientation', () => {
    expect(sb.between('tablet', 'desktop', 'portrait')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em) and (orientation: portrait)'
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query and landscape orientation', () => {
    expect(sb.between('tablet', 'desktop', 'landscape')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em) and (orientation: landscape)'
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query (from default theme)', () => {
    expect(sb.between('tablet', 'desktop')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em)'
    );
  });
});

describe('only', () => {
  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query', () => {
    expect(sb.only('tablet')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em)'
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query with portrait orientation', () => {
    expect(sb.only('tablet', 'portrait')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em) and (orientation: portrait)'
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query with landscape orientation', () => {
    expect(sb.only('tablet', 'landscape')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em) and (orientation: landscape)'
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query (from default theme)', () => {
    expect(sb.only('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em)'
    );
  });
});

describe('getBreakpointValue', () => {
  it('return breakpoint value if breakpoint name is valid', () => {
    expect(sb.getBreakpointValue('tablet', sb.DEFAULT_BREAKS_MAP)).toEqual(
      '768px'
    );
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      sb.getBreakpointValue('!!!', sb.DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.`
      );
    }
  });
});

describe('getNextBreakpointName', () => {
  it('return next breakpoint name if breakpoint name is valid', () => {
    expect(sb.getNextBreakpointName('tablet')(sb.DEFAULT_BREAKS_MAP)).toEqual(
      'desktop'
    );
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      sb.getNextBreakpointName('!!!')(sb.DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.`
      );
    }
  });
});

describe('getNextBreakpointValue', () => {
  it('return next breakpoint value if breakpoint name is valid', () => {
    expect(sb.getNextBreakpointValue('tablet', sb.DEFAULT_BREAKS_MAP)).toEqual(
      '991.98px'
    );
  });

  it('show warn if the name of the breakpoint is invalid', () => {
    try {
      sb.getNextBreakpointValue('!!!', sb.DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: '!!!' is invalid breakpoint name. Use 'tablet, desktop'.`
      );
    }
  });

  it('show warn if the breakpoint cannot be used ', () => {
    try {
      sb.getNextBreakpointValue('lgDesktop', sb.DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: Don't use 'lgDesktop' because it doesn't have a maximum width. Use 'desktop'. See https://github.com/mg901/styled-breakpoints/issues/4 .`
      );
    }
  });
});

describe('withMinMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(sb.withMinMedia('40em')).toEqual('@media (min-width: 40em)');
  });
});

describe('withMaxMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(sb.withMaxMedia('40em')).toEqual('@media (max-width: 40em)');
  });
});

describe('withMinAndMaxMedia', () => {
  it('should return string containing the breakpoint value  with media query', () => {
    expect(sb.withMinAndMaxMedia('40em', '60em')).toEqual(
      '@media (min-width: 40em) and (max-width: 60em)'
    );
  });
});

describe('calcMinWidth', () => {
  it('calculate min with in pixels from default theme', () => {
    expect(sb.calcMinWidth('desktop', sb.DEFAULT_BREAKS)).toEqual('62em');
  });
});

describe('calcMaxWidth', () => {
  it('calculate max with in pixels from default theme', () => {
    expect(sb.calcMaxWidth('tablet', sb.DEFAULT_BREAKS)).toEqual('61.99875em');
  });
});

describe('errorReporter', () => {
  it('return object Error with error message', () => {
    expect(sb.invariant).toThrow();
  });
});

describe('toEm', () => {
  it('convert values from pixels to ems', () => {
    expect(sb.toEm('16px')).toEqual('1em');
  });
});

describe('makeErrorMessage', () => {
  it('return string with error message', () => {
    expect(sb.makeErrorMessage('xs', sb.DEFAULT_BREAKS_MAP)).toEqual(
      "'xs' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'."
    );
  });
});
