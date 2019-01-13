// @flow

import type { BreakpointsMap, ThemeWithBreakpoints } from './models';

export const defaultBreaks: BreakpointsMap = {
  phone: '576px',
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

export const themeWithDefaultBreaks: ThemeWithBreakpoints = {
  theme: { breakpoints: defaultBreaks },
};
