// @flow

export type BreakpointsMap = { [name: string]: string };

export type ExactBreakpoints = {
  breakpoints: BreakpointsMap,
};

export type OptionalBreakpoints = {
  breakpoints?: BreakpointsMap,
};

export type ThemeWithExactBreakpoints = {
  theme: ExactBreakpoints,
};

export type ThemeWithOptionalBreakpoints = {
  theme: OptionalBreakpoints,
};
