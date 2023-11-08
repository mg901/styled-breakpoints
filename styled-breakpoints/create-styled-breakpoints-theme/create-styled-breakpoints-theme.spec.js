const {
  createStyledBreakpointsTheme,
} = require('./create-styled-breakpoints-theme');

describe('styled breakpoints', () => {
  describe('default breakpoints', () => {
    // Arrange
    const { breakpoints } = createStyledBreakpointsTheme();
    const { up, down, between, only } = breakpoints;
    const testCases = [
      ['up', up],
      ['down', down],
      ['between', between],
      ['only', only],
    ];

    it.each(testCases)(
      'should have method "%s" which is a Function',
      (_, method) => {
        // Act and Assert
        expect(method).toBeInstanceOf(Function);
      }
    );

    describe('up', () => {
      it('should return a media query string for a breakpoint above a certain width', () => {
        // Act and Assert
        expect(up('sm')).toBe('@media (min-width: 576px)');
        expect(up('md')).toBe('@media (min-width: 768px)');
      });

      it('should include orientation in the media query when specified', () => {
        // Act and Assert
        expect(up('sm', 'landscape')).toBe(
          '@media (min-width: 576px) and (orientation: landscape)'
        );
      });
    });

    describe('down', () => {
      it('should return a media query string for a breakpoint below a certain width', () => {
        // Act and Assert
        expect(down('sm')).toBe('@media (max-width: 575.98px)');
        expect(down('md')).toBe('@media (max-width: 767.98px)');
      });

      it('should include orientation in the media query when specified', () => {
        // Act and Assert
        expect(down('sm', 'landscape')).toBe(
          '@media (max-width: 575.98px) and (orientation: landscape)'
        );
      });
    });

    describe('between', () => {
      it('should return a media query string for a range of widths', () => {
        // Act and Assert
        expect(between('sm', 'md')).toBe(
          '@media (min-width: 576px) and (max-width: 767.98px)'
        );
      });

      it('should include orientation in the media query when specified', () => {
        // Act and Assert
        expect(between('sm', 'md', 'landscape')).toBe(
          '@media (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape)'
        );
      });
    });

    describe('only', () => {
      it('should return a media query string for a breakpoint at a certain width', () => {
        // Act and Assert
        expect(only('sm')).toBe(
          '@media (min-width: 576px) and (max-width: 767.98px)'
        );

        // Act and Assert
        expect(only('md')).toBe(
          '@media (min-width: 768px) and (max-width: 991.98px)'
        );
      });

      it('should return a media query string for a breakpoint above a certain width', () => {
        // Act and Assert
        expect(only('xxl')).toBe('@media (min-width: 1400px)');
      });

      it('should include orientation in the media query when specified', () => {
        // Act and Assert
        expect(only('sm', 'landscape')).toBe(
          '@media (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape)'
        );
      });
    });
  });

  describe('custom breakpoints', () => {
    it('should return correct breakpoints using custom breakpoints', () => {
      // Arrange
      const theme = createStyledBreakpointsTheme({
        breakpoints: {
          small: '0px',
          medium: '640px',
          large: '1024px',
          xLarge: '1200px',
          xxLarge: '1440px',
        },
      });

      // Act and Assert
      expect(theme.breakpoints.down('medium')).toEqual(
        '@media (max-width: 639.98px)'
      );

      expect(theme.breakpoints.between('medium', 'large')).toEqual(
        '@media (min-width: 640px) and (max-width: 1023.98px)'
      );

      expect(theme.breakpoints.up('xLarge')).toEqual(
        '@media (min-width: 1200px)'
      );

      expect(theme.breakpoints.only('xxLarge')).toEqual(
        '@media (min-width: 1440px)'
      );
    });
  });
});
