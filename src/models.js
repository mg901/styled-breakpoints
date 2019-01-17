// @flow

export type BreakpointsMap = { [name: string]: string };

export type CustomTheme = {
  theme: {
    breakpoints?: BreakpointsMap,
  },
};

export type ThemeWithBreakpoints = {
  theme: {
    breakpoints: BreakpointsMap,
  },
};

export const customBreaks: BreakpointsMap = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
};

export const customTheme: ThemeWithBreakpoints = {
  theme: { breakpoints: customBreaks },
};
