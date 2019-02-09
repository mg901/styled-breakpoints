// @flow
import { errorReporter, pxToEm, setCustomOrDefaultTheme } from './helpers';
import { eitherGetBreakVal, eitherGetNextBreakVal } from './media-queries';
import type { CustomTheme } from './models';

type CalcMinWidthInPx = (string, CustomTheme, ?string) => string;
export const calcMinWidthInPx: CalcMinWidthInPx = (
  breakName,
  theme,
  errorPrefix,
) => {
  const newTheme = setCustomOrDefaultTheme(theme);
  return eitherGetBreakVal(newTheme.breakpoints, breakName).fold(
    errorReporter(errorPrefix),
    pxToEm,
  );
};

type CalcMaxWidthInPx = (string, CustomTheme, ?string) => string;
export const calcMaxWidthInPx: CalcMaxWidthInPx = (
  breakName,
  theme,
  errorPrefix,
) => {
  const newTheme = setCustomOrDefaultTheme(theme);
  return eitherGetNextBreakVal(
    newTheme.breakpoints,
    breakName,
    errorPrefix,
  ).fold(errorReporter(errorPrefix), pxToEm);
};
