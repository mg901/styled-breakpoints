const CONFIG_SYMBOL = '@typographist/styled';

const INVALID_BREAKPOINTS = {
  sm: '36em',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const PROPS_WITH_CUSTOM_THEME = {
  theme: {
    breakpoints: {
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
    [CONFIG_SYMBOL]: {
      mediaQueries: {
        tablet: '768px',
        desktop: '992px',
        lgDesktop: '1200px',
      },
    },
  },
};

const BREAKPOINTS = PROPS_WITH_CUSTOM_THEME.theme.breakpoints;
const CUSTOM_THEME = PROPS_WITH_CUSTOM_THEME.theme;
const EMPTY_THEME = PROPS_WITH_EMPTY_THEME.theme;
const TYPOGRAPHIST_THEME = PROPS_WITH_TYPOGRAPHIST_THEME.theme;

module.exports = {
  CONFIG_SYMBOL,
  INVALID_BREAKPOINTS,
  PROPS_WITH_CUSTOM_THEME,
  PROPS_WITH_EMPTY_THEME,
  BREAKPOINTS,
  CUSTOM_THEME,
  EMPTY_THEME,
  TYPOGRAPHIST_THEME,
};
