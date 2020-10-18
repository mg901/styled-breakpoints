export const CONFIG_SYMBOL = Symbol('@typographist/styled');

export const INVALID_BREAKPOINTS = {
  sm: '36em',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const CONTEXT_WITH_CUSTOM_THEME = {
  theme: {
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
};

export const CONTEXT_WITH_EMPTY_THEME = {
  theme: {},
};

export const CONTEXT_WITH_TYPOGRAPHIST_THEME = {
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

export const BREAKPOINTS = CONTEXT_WITH_CUSTOM_THEME.theme.breakpoints;
export const CUSTOM_THEME = CONTEXT_WITH_CUSTOM_THEME.theme;
export const EMPTY_THEME = CONTEXT_WITH_EMPTY_THEME.theme;
export const TYPOGRAPHIST_THEME = CONTEXT_WITH_TYPOGRAPHIST_THEME.theme;
