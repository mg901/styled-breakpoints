// @flow

export type BreakpointsMap = { [name: string]: string };

export type ExactBreakpoints = {
  breakpoints: BreakpointsMap,
};

export type CustomBreakpoints = {
  ERROR_PREFIX_FOR_STYLED_BREAKPOINTS?: string,
  breakpoints?: BreakpointsMap,
};

export type BpProps = {
  theme: CustomBreakpoints,
};
