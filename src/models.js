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
