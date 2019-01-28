// @flow

import { DEFAULT_BREAKS, DEFAULT_PREFIX_FOR_ERROR_MSG } from './constants';
import type {
  BreakpointsMap,
  CustomBreakpoints,
  ExactBreakpoints,
} from './models';

const isString = (value: mixed) => typeof value === 'string';
const isObject = (value: mixed) =>
  Object.prototype.toString.call(value).slice(8, -1) === 'Object';

export const pxToEm = (inPx: string) => `${parseFloat(inPx) / 16}em`;

export const errorReporter = (
  prefix: ?string = DEFAULT_PREFIX_FOR_ERROR_MSG,
) => (message: string) => {
  throw new Error(`[${String(prefix)}]: ${message}`);
};

export const getBreakNames: (BreakpointsMap) => string[] = (breaks) =>
  Object.keys(breaks);

export const makeErrorMessage = (breakName: string, breaks: BreakpointsMap) =>
  `'${breakName}' is invalid breakpoint name. Use '${getBreakNames(breaks).join(
    ', ',
  )}'.`;

type SetDefaultTheme = (CustomBreakpoints) => ExactBreakpoints;
export const setDefaultTheme: SetDefaultTheme = (theme) => {
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
