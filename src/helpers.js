// @flow

import { DEFAULT_BREAKS, DEFAULR_PREFIX_FOR_ERROR_MSG } from './constants';
import type {
  BreakpointsMap,
  OptionalBreakpoints,
  ExactBreakpoints,
} from './models';

export const errorReporter = (
  prefix: ?string = DEFAULR_PREFIX_FOR_ERROR_MSG,
) => (message: string) => {
  throw new Error(`[${String(prefix)}]: ${message}`);
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

const isString = (value: mixed) => typeof value === 'string';
const isObject = (value: mixed) =>
  Object.prototype.toString.call(value).slice(8, -1) === 'Object';

type SetDefaultTheme = (OptionalBreakpoints) => ExactBreakpoints;
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
