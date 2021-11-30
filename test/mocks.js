const TYPOGRAPHIST_KEY = '@typographist/styled';

const INVALID_BREAKPOINTS = {
  sm: '36em',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const PROPS_WITH_CUSTOM_THEME = {
  theme: {
    breakpoints: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
};

const PROPS_WITH_EMPTY_THEME = {
  theme: {},
};

const PROPS_WITH_TYPOGRAPHIST_THEME = {
  theme: {
    [TYPOGRAPHIST_KEY]: {
      mediaQueries: {
        tablet: '768px',
        desktop: '992px',
        lgDesktop: '1200px',
      },
    },
  },
};

module.exports = {
  TYPOGRAPHIST_KEY,
  INVALID_BREAKPOINTS,
  PROPS_WITH_CUSTOM_THEME,
  PROPS_WITH_EMPTY_THEME,
  BREAKPOINTS: PROPS_WITH_CUSTOM_THEME.theme.breakpoints,
  CUSTOM_THEME: PROPS_WITH_CUSTOM_THEME.theme,
  EMPTY_THEME: PROPS_WITH_EMPTY_THEME.theme,
  TYPOGRAPHIST_THEME: PROPS_WITH_TYPOGRAPHIST_THEME.theme,
};
