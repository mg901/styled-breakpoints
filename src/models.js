// @flow

export type BreakpointsMap = { [name: string]: string };

export type UserTheme = {
  theme: {
    breakpoints?: BreakpointsMap,
  },
};

export type DefaultUserTheme = {
  theme: {
    breakpoints: BreakpointsMap,
  },
};
