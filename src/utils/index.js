// @flow strict

import type {
  Breakpoints,
  CustomTheme,
  ThemeWithBreaks,
  BpProps,
} from '../models';

export const DEFAULT_BREAKS_MAP: Breakpoints = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

export const DEFAULT_BREAKS: ThemeWithBreaks = {
  breakpoints: DEFAULT_BREAKS_MAP,
};

export const withMinMedia = (minWidth: string): string =>
  `@media (min-width: ${minWidth})`;

export const withMaxMedia = (maxWidth: string): string =>
  `@media (max-width: ${maxWidth})`;

export const withMinAndMaxMedia = (
  minWidth: string,
  maxWidth: string,
): string => `@media (min-width: ${minWidth}) and (max-width: ${maxWidth})`;

export const isObject = (value: mixed): boolean =>
  Object.prototype.toString.call(value).slice(8, -1) === 'Object';

export const toEm = (inPx: string): string => `${parseFloat(inPx) / 16}em`;

export const makeErrorMessage = (
  breakName: string,
  breaks: Breakpoints,
): string =>
  `'${String(breakName)}' is invalid breakpoint name. Use '${Object.keys(
    breaks,
  ).join(', ')}'.`;

export const setCustomOrDefaultTheme = (theme: CustomTheme): ThemeWithBreaks =>
  theme &&
  theme.breakpoints &&
  isObject(theme.breakpoints) &&
  Object.keys(theme.breakpoints).length > 0
    ? { ...theme }
    : { ...theme, ...DEFAULT_BREAKS };

export const invariant = (condition: mixed, message: string): void => {
  if (!condition) {
    throw new Error(`[styled-breakpoints]: ${String(message)}`);
  }
};

export const getBreakpointValue = (
  breakName: string,
  breaks: Breakpoints,
): string => {
  invariant(breaks[String(breakName)], makeErrorMessage(breakName, breaks));

  return breaks[breakName];
};

export const getNextBreakpointName: (string) => (Breakpoints) => string = (
  breakName,
) => (breaks) => {
  const breakNames = Object.keys(breaks);
  const penultimateBreakName = breakNames[breakNames.length - 2];
  const currentPosition = breakNames.indexOf(String(breakName));
  const isInvalidBreakName = currentPosition === -1;
  const isLastBreakName =
    currentPosition > -1 && currentPosition >= breakNames.length - 1;

  if (isInvalidBreakName) {
    invariant(!isInvalidBreakName, makeErrorMessage(breakName, breaks));
  }

  if (isLastBreakName) {
    invariant(
      !isLastBreakName,
      `Don't use '${breakName}' because it doesn't have a maximum width. Use '${penultimateBreakName}'. See https://github.com/mg901/styled-breakpoints/issues/4`,
    );
  }

  return breakNames[currentPosition + 1];
};

// Maximum breakpoint width. Null for the largest (last) breakpoint.
// The maximum value is calculated as the minimum of the next one less 0.02px
// to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
// See https://bugs.webkit.org/show_bug.cgi?id=178261

export const getNextBreakpointValue = (
  breakName: string,
  breaks: Breakpoints,
): string => {
  invariant(
    breaks[breakName],
    `'${String(breakName)}' is invalid breakpoint name. Use '${Object.keys(
      breaks,
    )
      .slice(0, -1)
      .join(', ')}'.`,
  );
  const getNextProp = getNextBreakpointName(breakName);

  return `${parseFloat(breaks[getNextProp(breaks)]) - 0.02}px`;
};

export const calcMinWidth = (breakName: string, theme: CustomTheme): string => {
  const { breakpoints } = setCustomOrDefaultTheme(theme);

  return toEm(getBreakpointValue(breakName, breakpoints));
};

export const calcMaxWidth = (breakName: string, theme: CustomTheme): string => {
  const { breakpoints } = setCustomOrDefaultTheme(theme);

  return toEm(getNextBreakpointValue(breakName, breakpoints));
};

type Up = (string) => (BpProps) => string;
export const up: Up = (breakName) => ({ theme }) =>
  withMinMedia(calcMinWidth(breakName, theme));

type Down = (string) => (BpProps) => string;
export const down: Down = (breakName) => ({ theme }) =>
  withMaxMedia(calcMaxWidth(breakName, theme));

type Between = (string, string) => (BpProps) => string;
export const between: Between = (minBreak, maxBreak) => ({ theme }) =>
  withMinAndMaxMedia(
    calcMinWidth(minBreak, theme),
    calcMaxWidth(maxBreak, theme),
  );

type Only = (string) => (BpProps) => string;
export const only: Only = (breakName) => ({ theme }) =>
  withMinAndMaxMedia(
    calcMinWidth(breakName, theme),
    calcMaxWidth(breakName, theme),
  );
