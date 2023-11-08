const {
  createStyledBreakpointsTheme,
} = require('./create-styled-breakpoints-theme');

describe('styled breakpoints', () => {
  const { breakpoints } = createStyledBreakpointsTheme();
  const { up, down, between, only } = breakpoints;

  it('should have all the necessary methods', () => {
    expect(up).toBeInstanceOf(Function);
    expect(down).toBeInstanceOf(Function);
    expect(between).toBeInstanceOf(Function);
    expect(only).toBeInstanceOf(Function);
  });

  describe('up', () => {
    it('should return a media query string for a breakpoint above a certain width', () => {
      expect(up('sm')).toBe('@media (min-width: 576px)');
      expect(up('md')).toBe('@media (min-width: 768px)');
    });

    it('should include orientation in the media query when specified', () => {
      expect(up('sm', 'landscape')).toBe(
        '@media (min-width: 576px) and (orientation: landscape)'
      );
    });
  });

  describe('down', () => {
    it('should return a media query string for a breakpoint below a certain width', () => {
      expect(down('sm')).toBe('@media (max-width: 575.98px)');
      expect(down('md')).toBe('@media (max-width: 767.98px)');
    });

    it('should include orientation in the media query when specified', () => {
      expect(down('sm', 'landscape')).toBe(
        '@media (max-width: 575.98px) and (orientation: landscape)'
      );
    });
  });

  describe('between', () => {
    it('should return a media query string for a range of widths', () => {
      expect(between('sm', 'md')).toBe(
        '@media (min-width: 576px) and (max-width: 767.98px)'
      );
    });

    it('should include orientation in the media query when specified', () => {
      expect(between('sm', 'md', 'landscape')).toBe(
        '@media (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape)'
      );
    });
  });

  describe('only', () => {
    it('should return a media query string for a breakpoint at a certain width', () => {
      expect(only('sm')).toBe(
        '@media (min-width: 576px) and (max-width: 767.98px)'
      );
      expect(only('md')).toBe(
        '@media (min-width: 768px) and (max-width: 991.98px)'
      );
    });

    it('should return a media query string for a breakpoint above a certain width', () => {
      expect(only('xxl')).toBe('@media (min-width: 1400px)');
    });

    it('should include orientation in the media query when specified', () => {
      expect(only('sm', 'landscape')).toBe(
        '@media (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape)'
      );
    });
  });

  it('should return correct breakpoints using custom breakpoints', () => {
    const customTheme = createStyledBreakpointsTheme({
      breakpoints: {
        small: '0px',
        medium: '640px',
        large: '1024px',
        xLarge: '1200px',
        xxLarge: '1440px',
      },
    });

    expect(customTheme.breakpoints.down('medium')).toEqual(
      '@media (max-width: 639.98px)'
    );
    expect(customTheme.breakpoints.between('medium', 'large')).toEqual(
      '@media (min-width: 640px) and (max-width: 1023.98px)'
    );
    expect(customTheme.breakpoints.up('xLarge')).toEqual(
      '@media (min-width: 1200px)'
    );

    expect(customTheme.breakpoints.only('xxLarge')).toEqual(
      '@media (min-width: 1440px)'
    );
  });
});
