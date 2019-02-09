// @flow

import type { Breakpoints } from './models';

export const DEFAULT_PREFIX_FOR_ERROR_MSG = 'styled-breakpoints';

export const DEFAULT_BREAKS_MAP: Breakpoints = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

export const DEFAULT_BREAKS: { breakpoints: Breakpoints } = {
  breakpoints: DEFAULT_BREAKS_MAP,
};
