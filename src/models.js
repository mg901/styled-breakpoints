// @flow

export type BreakpointsMap = { [name: string]: string };

export type ExactBreakpoints = {
  breakpoints: BreakpointsMap,
};

export type OptionalBreakpoints = {
  ERROR_PREFIX_FOR_STYLED_BREAKPOINTS?: string,
  breakpoints?: BreakpointsMap,
};

export type ThemeWithOptionalBreakpoints = {
  theme: OptionalBreakpoints,
};
