import { createStyledBreakpointsTheme } from '.';

describe('createStyledBreakpointsTheme', () => {
  it('has expected API', () => {
    const theme = createStyledBreakpointsTheme();

    expect(theme.breakpoints.keys).toBeInstanceOf(Array);
    expect(theme.breakpoints.up).toBeTypeOf('function');
    expect(theme.breakpoints.down).toBeTypeOf('function');
    expect(theme.breakpoints.between).toBeTypeOf('function');
    expect(theme.breakpoints.only).toBeTypeOf('function');
  });

  describe('default config', () => {
    it('contains default breakpoints keys', () => {
      const theme = createStyledBreakpointsTheme();

      expect(theme.breakpoints.keys).toEqual([
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'xxl',
      ]);
    });
  });

  describe('custom config', () => {
    it('sorts breakpoints by numeric value in ascending order', () => {
      const theme = createStyledBreakpointsTheme({
        breakpoints: {
          values: {
            tablet: '768px',
            desktop: '1200px',
            phone: '576px',
            watch: '0px',
            laptop: '992px',
          },
        },
      });

      // Assert
      expect(theme.breakpoints.keys).toEqual([
        'watch',
        'phone',
        'tablet',
        'laptop',
        'desktop',
      ]);
    });
  });
});

describe('createBreakpointsTheme', () => {
  const theme = createStyledBreakpointsTheme();

  describe('breakpoints.up', () => {
    it('returns media query for a min breakpoint', () => {
      // Act
      const expected = theme.breakpoints.up('sm');

      expect(expected).toMatchInlineSnapshot(`"@media (width >= 576px)"`);
    });

    it('supports orientation', () => {
      expect(theme.breakpoints.up('sm', 'landscape')).toMatchInlineSnapshot(
        `"@media (width >= 576px) and (orientation: landscape)"`
      );
      expect(theme.breakpoints.up('sm', 'portrait')).toMatchInlineSnapshot(
        `"@media (width >= 576px) and (orientation: portrait)"`
      );
    });
  });

  describe('breakpoints.down', () => {
    it('returns media query for a max breakpoint', () => {
      // Act
      const expected = theme.breakpoints.down('sm');

      expect(expected).toMatchInlineSnapshot(`"@media (width <= 575.98px)"`);
    });
  });

  describe('breakpoints.between', () => {
    it('returns media query for a range between two breakpoints', () => {
      // Act
      const expected = theme.breakpoints.between('xs', 'xxl');

      expect(expected).toMatchInlineSnapshot(
        `"@media (width >= 0px) and (width <= 1399.98px)"`
      );
    });
  });

  describe('breakpoints.only', () => {
    it('returns media query for a single breakpoint range', () => {
      const expected = theme.breakpoints.only('md');

      expect(expected).toMatchInlineSnapshot(
        `"@media (width >= 768px) and (width <= 991.98px)"`
      );
    });

    it('behaves like up() for the last breakpoint', () => {
      const expected = theme.breakpoints.only('xxl');

      expect(expected).toMatchInlineSnapshot(`"@media (width >= 1400px)"`);
    });
  });
});
