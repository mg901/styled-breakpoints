// @flow

import type { BreakpointsMap, ThemeWithBreakpoints } from './models';

const customBreaks: BreakpointsMap = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
};

export const customTheme: ThemeWithBreakpoints = {
  theme: { breakpoints: customBreaks },
};
