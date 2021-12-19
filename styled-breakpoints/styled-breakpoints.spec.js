const { createStyledBreakpoints } = require('./styled-breakpoints');

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
      expect(up('sm')(props)).toEqual('@media (min-width: 36em)');
    } catch (error) {
      expect(error.message).toEqual(
        `${ERROR_PREFIX}Check your theme. \`xs: 0dd9px, md: 992rem, lg: 20em, xl: jflksdjdjkdpx,\` are invalid breakpoints. Use only pixels.`
      );
    }
  });

  it('should pick up custom breakpoints from theme', () => {
    const { up } = createStyledBreakpoints();

    const props = {
      theme: {
        breakpoints: {
          mobile: '576px',
          tablet: '768px',
          desktop: '992px',
        },
      },
    };

    const mockBreakpoints = [
      ['mobile', '36em'],
      ['tablet', '48em'],
      ['desktop', '62em'],
    ];

    mockBreakpoints.forEach(([key, value]) => {
      expect(up(key)(props)).toEqual(`@media (min-width: ${value})`);
    });
  });

  const { up, down, between, only } = createStyledBreakpoints();
  describe('up', () => {
    it('should render a media query if the screen width is greater than or equal to 36em', () => {
      expect(up('sm')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 36em)'
      );
    });

    it('should render a media query if the screen width is greater than or equal to 36em for portrait orientation', () => {
      expect(up('sm', 'portrait')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 36em) and (orientation: portrait)'
      );
    });

    it('should render a media query if the screen width is greater than or equal to 36em for landscape orientation', () => {
      expect(up('sm', 'landscape')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 36em) and (orientation: landscape)'
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
    it('should render a media query if the screen width is less or equal to 35.99875em', () => {
      expect(down('xs')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (max-width: 35.99875em)'
      );
    });

    it('should render a media query if the screen width is less or equal to 47.99875em for portrait orientation', () => {
      expect(down('sm', 'portrait')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (max-width: 47.99875em) and (orientation: portrait)'
      );
    });

    it('should render a media query if the screen width is less or equal to 47.99875em for landscape orientation', () => {
      expect(down('sm', 'landscape')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (max-width: 47.99875em) and (orientation: landscape)'
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
    it('should render a media query if the screen width greater than equal to 36em and less than or equal to 61.99875em', () => {
      expect(between('sm', 'md')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 36em) and (max-width: 61.99875em)'
      );
    });

    it('should render a media query if the screen width greater than equal to 36em and less than or equal to 61.99875em and portrait orientation', () => {
      expect(between('sm', 'md', 'portrait')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 36em) and (max-width: 61.99875em) and (orientation: portrait)'
      );
    });

    it('should render a media query if the screen width greater than equal to 36em and less than or equal to 61.99875em and landscape orientation', () => {
      expect(between('sm', 'md', 'landscape')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 36em) and (max-width: 61.99875em) and (orientation: landscape)'
      );
    });
  });

  describe('only', () => {
    it('should render a media query if the screen width greater than equal to 36em and less than or equal to 47.99875em', () => {
      expect(only('sm')(PROPS_WITH_EMPTY_THEME)).toEqual(
        '@media (min-width: 36em) and (max-width: 47.99875em)'
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
        ['mobile', '48em'],
        ['tablet', '62em'],
        ['desktop', '75em'],
      ];

      mockBreakpoints.forEach(([key, value]) => {
        expect(bp.up(key)(props)).toEqual(`@media (min-width: ${value})`);
      });
    });
  });
});
