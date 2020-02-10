export const CONFIG_SYMBOL = '@typographist/styled';

export const INVALID_BREAKPOINTS = {
  sm: '36em',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const PROPS_WITH_CUSTOM_THEME = {
  theme: {
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
};

export const PROPS_WITH_EMPTY_THEME = {
  theme: {},
};

export const PROPS_WITH_TYPOGRAPHIST_THEME = {
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

export const BREAKPOINTS = PROPS_WITH_CUSTOM_THEME.theme.breakpoints;
export const CUSTOM_THEME = PROPS_WITH_CUSTOM_THEME.theme;
export const EMPTY_THEME = PROPS_WITH_EMPTY_THEME.theme;
export const TYPOGRAPHIST_THEME = PROPS_WITH_TYPOGRAPHIST_THEME.theme;
