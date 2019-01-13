// @flow

import { THEME_WITH_DEFAULT_BREAKS } from '../constants';
import { errorReport, pxToEm } from '../helpers';
import { eitherGetBreakVal, eitherGetNextBreakVal } from '../media-queries';

type CalcMinWidthInPx = (*, string) => string;
export const calcMinWidthInPx: CalcMinWidthInPx = (
  { theme } = THEME_WITH_DEFAULT_BREAKS,
  breakName: string,
) => eitherGetBreakVal(theme.breakpoints, breakName).fold(errorReport, pxToEm);

type CalcMaxWidthInPx = (*, string) => string;
export const calcMaxWidthInPx: CalcMaxWidthInPx = (
  { theme } = THEME_WITH_DEFAULT_BREAKS,
  breakName,
) =>
  eitherGetNextBreakVal(theme.breakpoints, breakName).fold(errorReport, pxToEm);
