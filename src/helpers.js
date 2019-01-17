// @flow

import type { BreakpointsMap } from './models';

export const errorReport = (message: string) => {
  throw new Error(`Styled breakpoints >>> ${message}`);
};

export const pxToEm = (inPx: string) => `${parseFloat(inPx) / 16}em`;

type GetBreakNames = (BreakpointsMap) => string[];
export const getBreakNames: GetBreakNames = (breaks) => Object.keys(breaks);

export const makeErrorMessage = (
  invalidBreakName: string,
  breaks: BreakpointsMap,
) =>
  `'${invalidBreakName}' is invalid breakpoint name. Use '${getBreakNames(
    breaks,
  ).join(', ')}'.`;
