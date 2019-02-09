// @flow

import { DEFAULT_BREAKS, DEFAULT_PREFIX_FOR_ERROR_MSG } from './constants';
import type { Breakpoints, CustomTheme, ThemeWithBreaks } from './models';

const isString = (value: mixed) => typeof value === 'string';
const isObject = (value: mixed) =>
  Object.prototype.toString.call(value).slice(8, -1) === 'Object';

export const pxToEm = (inPx: string) => `${parseFloat(inPx) / 16}em`;

export const errorReporter = (
  prefix: ?string = DEFAULT_PREFIX_FOR_ERROR_MSG,
) => (message: string) => {
  throw new Error(`[${String(prefix)}]: ${message}`);
};

export const getBreakNames: (Breakpoints) => string[] = (breaks) =>
  Object.keys(breaks);

export const makeErrorMessage = (breakName: string, breaks: Breakpoints) =>
  `'${breakName}' is invalid breakpoint name. Use '${getBreakNames(breaks).join(
    ', ',
  )}'.`;

type SetCustomOrDefaultTheme = (CustomTheme) => ThemeWithBreaks;
export const setCustomOrDefaultTheme: SetCustomOrDefaultTheme = (theme) => {
  if (
    theme &&
    theme.breakpoints &&
    isObject(theme.breakpoints) &&
    Object.keys(theme.breakpoints).every(isString)
  ) {
    return { ...theme };
  }
  return { ...theme, ...DEFAULT_BREAKS };
};
