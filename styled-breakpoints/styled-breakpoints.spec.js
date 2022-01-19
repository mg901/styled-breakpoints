const {
  createStyledBreakpoints,
  createTheme,
} = require('./styled-breakpoints');

const ERROR_PREFIX = '[styled-breakpoints]: ';
const PROPS_WITH_EMPTY_THEME = {
  theme: {},
};

describe('styled-breakpoints', () => {
  it('should show a message with invalid names and breakpoint values', () => {
    const { up } = createStyledBreakpoints();

    const props = {
      theme: {
        breakpoints: {
          xs: '0dd9px',
          sm: '776px',
          md: '992rem',
          lg: '20em',
          xl: 'jflksdjdjkdpx',
        },
      },
    };

    try {
      up('sm')(props);
    } catch (error) {
      expect(error.message).toEqual(
        `${ERROR_PREFIX}Check your theme. \`xs: 0dd9px, md: 992rem, lg: 20em, xl: jflksdjdjkdpx,\` are invalid breakpoints. Use only pixels.`
      );
    }
  });

  it('should pick up custom breakpoints from theme', () => {
    const { up } = createStyledBreakpoints();
    const breakpoints = {
      mobile: '576px',
      tablet: '768px',
      desktop: '992px',
    };

    const props = {
      theme: createTheme(breakpoints),
    };

    Object.entries(breakpoints).forEach(([key, value]) => {
      expect(up(key)(props)).toEqual(`@media (min-width: ${value})`);
    });
  });

  const { up, down, between, only } = createStyledBreakpoints();
  describe('up', () => {
    it('should render a media query if the screen width is greater than or equal to 576px', () => {
      expect(up('sm')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 576px)'
      );
    });

    it('should render a media query if the screen width is greater than or equal to 576px for portrait orientation', () => {
      expect(up('sm', 'portrait')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 576px) and (orientation: portrait)'
      );
    });

    it('should render a media query if the screen width is greater than or equal to 576px for landscape orientation', () => {
      expect(up('sm', 'landscape')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 576px) and (orientation: landscape)'
      );
    });

    it('should throw an exception if device orientation is not valid', () => {
      try {
        up('sm', 'wtf')(PROPS_WITH_EMPTY_THEME);
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`wtf\` is invalid orientation. Use \`landscape\` or \`portrait\`.`
        );
      }
    });
  });

  describe('down', () => {
    it('should render a media query if the screen width is less or equal to 575.98px', () => {
      expect(down('sm')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (max-width: 575.98px)'
      );
    });

    it('should render a media query if the screen width is less or equal to 767.98px for portrait orientation', () => {
      expect(down('sm', 'portrait')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (max-width: 575.98px) and (orientation: portrait)'
      );
    });

    it('should render a media query if the screen width is less or equal to 767.98px for landscape orientation', () => {
      expect(down('sm', 'landscape')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (max-width: 575.98px) and (orientation: landscape)'
      );
    });

    it('should throw an exception if device orientation is not valid', () => {
      try {
        down('sm', 'wtf')(PROPS_WITH_EMPTY_THEME);
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`wtf\` is invalid orientation. Use \`landscape\` or \`portrait\`.`
        );
      }
    });
  });

  describe('between', () => {
    it('should render a media query if the screen width greater than equal to 576px and less than or equal to 991.98px', () => {
      expect(between('sm', 'md')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 576px) and (max-width: 767.98px)'
      );
    });

    it('should render a media query if the screen width greater than equal to 576px and less than or equal to 991.98px and portrait orientation', () => {
      expect(between('sm', 'md', 'portrait')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 576px) and (max-width: 767.98px) and (orientation: portrait)'
      );
    });

    it('should render a media query if the screen width greater than equal to 576px and less than or equal to 991.98px and landscape orientation', () => {
      expect(between('sm', 'md', 'landscape')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape)'
      );
    });
  });

  describe('only', () => {
    it('should render a media query if the screen width greater than equal to 576px and less than or equal to 767.98px', () => {
      expect(only('sm')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 576px) and (max-width: 767.98px)'
      );
    });
  });

  describe('integration with other libraries', () => {
    const TYPOGRAPHIST_KEY = '@typographist/styled';
    const PROPS_WITH_TYPOGRAPHIST_THEME = {
      theme: {
        [TYPOGRAPHIST_KEY]: {
          mediaQueries: {
            mobile: '768px',
            tablet: '992px',
            desktop: '1200px',
          },
        },
      },
    };
    it('should pick up custom breakpoints from Typographist theme', () => {
      const bp = createStyledBreakpoints({
        pathToMediaQueries: `${TYPOGRAPHIST_KEY}.mediaQueries`,
      });

      const props = PROPS_WITH_TYPOGRAPHIST_THEME;

      const mockBreakpoints = [
        ['mobile', '768px'],
        ['tablet', '992px'],
        ['desktop', '1200px'],
      ];

      mockBreakpoints.forEach(([key, value]) => {
        expect(bp.up(key)(props)).toEqual(`@media (min-width: ${value})`);
      });
    });
  });
});
