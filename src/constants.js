// @flow

import type { BreakpointsMap } from './models';

export const DEFAULT_BREAKS_MAP: BreakpointsMap = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

export const DEFAULT_BREAKS: { breakpoints: BreakpointsMap } = {
  breakpoints: DEFAULT_BREAKS_MAP,
};
