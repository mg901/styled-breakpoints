import { createStyledBreakpointsTheme } from '.';

describe('public entry point', () => {
  it('exposes the full breakpoints API', () => {
    const theme = createStyledBreakpointsTheme();

    expect(theme.breakpoints.keys).toEqual([
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      'xxl',
    ]);
    expect(theme.breakpoints.up).toBeTypeOf('function');
    expect(theme.breakpoints.down).toBeTypeOf('function');
    expect(theme.breakpoints.between).toBeTypeOf('function');
    expect(theme.breakpoints.only).toBeTypeOf('function');
  });

  it('keeps keys of a custom config', () => {
    const theme = createStyledBreakpointsTheme({
      breakpoints: {
        values: {
          mobile: '0px',
          tablet: '768px',
          desktop: '1200px',
        },
      },
    });

    expect(theme.breakpoints.keys).toEqual(['mobile', 'tablet', 'desktop']);
  });

  it('builds media queries', () => {
    const theme = createStyledBreakpointsTheme();

    expect(theme.breakpoints.up('md')).toBe('@media (width >= 768px)');
  });

  it('still validates through the wrapper', () => {
    const theme = createStyledBreakpointsTheme();

    expect(() =>
      // @ts-expect-error
      theme.breakpoints.up('nope')
    ).toThrow(/does not exist/);
  });
});
