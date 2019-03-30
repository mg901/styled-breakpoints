import {
  invariant,
  toEm,
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
} from '../src/utils';

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
      getNextBreakpointValue('xlDesktop', DEFAULT_BREAKS_MAP);
      expect(true).toEqual(false);
    } catch (e) {
      expect(e.message).toEqual(
        `[styled-breakpoints]: 'xlDesktop' is invalid breakpoint name. Use 'tablet, desktop'.`,
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
