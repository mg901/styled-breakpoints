// @flow
import { errorReport, pxToEm, setDefaultTheme } from './helpers';
import { eitherGetBreakVal, eitherGetNextBreakVal } from './media-queries';
import type { OptionalBreakpoints } from './models';

type CalcMinWidthInPx = (string, OptionalBreakpoints) => string;
export const calcMinWidthInPx: CalcMinWidthInPx = (breakName, theme) => {
  const newTheme = setDefaultTheme(theme);
  return eitherGetBreakVal(newTheme.breakpoints, breakName).fold(
    errorReport,
    pxToEm,
  );
};

type CalcMaxWidthInPx = (string, OptionalBreakpoints) => string;
export const calcMaxWidthInPx: CalcMaxWidthInPx = (breakName, theme) => {
  const newTheme = setDefaultTheme(theme);
  return eitherGetNextBreakVal(newTheme.breakpoints, breakName).fold(
    errorReport,
    pxToEm,
  );
};
