// @flow

import type { BreakpointsMap, DefaultUserTheme } from './models';

export const DEFAULT_BREAKS: BreakpointsMap = {
  phone: '576px',
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

export const THEME_WITH_DEFAULT_BREAKS: DefaultUserTheme = {
  theme: { breakpoints: DEFAULT_BREAKS },
};
