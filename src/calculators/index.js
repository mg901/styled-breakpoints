// @flow

import { themeWithDefaultBreaks } from '../constants';
import { errorReport, pxToEm } from '../helpers';
import { eitherGetBreakVal, eitherGetNextBreakVal } from '../media-queries';

type CalcMinWidthInPx = (*, string) => string;
export const calcMinWidthInPx: CalcMinWidthInPx = (
  { theme } = themeWithDefaultBreaks,
  breakName: string,
) => eitherGetBreakVal(theme.breakpoints, breakName).fold(errorReport, pxToEm);

type CalcMaxWidthInPx = (*, string) => string;
export const calcMaxWidthInPx: CalcMaxWidthInPx = (
  { theme } = themeWithDefaultBreaks,
  breakName,
) =>
  eitherGetNextBreakVal(theme.breakpoints, breakName).fold(errorReport, pxToEm);
