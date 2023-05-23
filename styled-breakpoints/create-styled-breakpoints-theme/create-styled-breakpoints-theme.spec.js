const {
  createStyledBreakpointsTheme,
} = require('./create-styled-breakpoints-theme');

describe('styled breakpoints', () => {
  let theme = null;

  beforeAll(() => {
    theme = createStyledBreakpointsTheme();
  });

  it('should have all the necessary methods', () => {
    expect(theme.breakpoints.up).toBeInstanceOf(Function);
    expect(theme.breakpoints.down).toBeInstanceOf(Function);
    expect(theme.breakpoints.between).toBeInstanceOf(Function);
    expect(theme.breakpoints.only).toBeInstanceOf(Function);
  });

  describe('up', () => {
    it('should return a media query string for a breakpoint above a certain width', () => {
      expect(theme.breakpoints.up('sm')).toBe('@media (min-width: 576px)');
      expect(theme.breakpoints.up('md')).toBe('@media (min-width: 768px)');
    });

    it('should include orientation in the media query when specified', () => {
      expect(theme.breakpoints.up('sm', 'landscape')).toBe(
        '@media (min-width: 576px) and (orientation: landscape)'
      );
    });
  });

  describe('down', () => {
    it('should return a media query string for a breakpoint below a certain width', () => {
      expect(theme.breakpoints.down('sm')).toBe('@media (max-width: 575.98px)');
      expect(theme.breakpoints.down('md')).toBe('@media (max-width: 767.98px)');
    });

    it('should include orientation in the media query when specified', () => {
      expect(theme.breakpoints.down('sm', 'landscape')).toBe(
        '@media (max-width: 575.98px) and (orientation: landscape)'
      );
    });
  });

  describe('between', () => {
    it('should return a media query string for a range of widths', () => {
      expect(theme.breakpoints.between('sm', 'md')).toBe(
        '@media (min-width: 576px) and (max-width: 767.98px)'
      );
    });

    it('should include orientation in the media query when specified', () => {
      expect(theme.breakpoints.between('sm', 'md', 'landscape')).toBe(
        '@media (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape)'
      );
    });
  });

  describe('only', () => {
    it('should return a media query string for a breakpoint at a certain width', () => {
      expect(theme.breakpoints.only('sm')).toBe(
        '@media (min-width: 576px) and (max-width: 767.98px)'
      );
      expect(theme.breakpoints.only('md')).toBe(
        '@media (min-width: 768px) and (max-width: 991.98px)'
      );
    });

    it('should return a media query string for a breakpoint above a certain width', () => {
      expect(theme.breakpoints.only('xxl')).toBe('@media (min-width: 1400px)');
    });

    it('should include orientation in the media query when specified', () => {
      expect(theme.breakpoints.only('sm', 'landscape')).toBe(
        '@media (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape)'
      );
    });
  });
});
