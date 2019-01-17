// @flow

import type { BreakpointsMap, ThemeWithBreakpoints } from './models';

export const DEFAULT_BREAKS: BreakpointsMap = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

export const THEME_WITH_DEFAULT_BREAKS: ThemeWithBreakpoints = {
  theme: { breakpoints: DEFAULT_BREAKS },
};

export const CUSTOM_BREAKS: BreakpointsMap = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
};

export const CUSTOM_THEME: ThemeWithBreakpoints = {
  theme: { breakpoints: CUSTOM_BREAKS },
};
