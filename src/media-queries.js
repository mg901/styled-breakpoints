// @flow

import { Right, Left } from 'igogo';
import { makeErrorMessage, getBreakNames, errorReport } from './helpers';
import type { BreakpointsMap } from './models';

export const eitherGetBreakVal = (breaks: BreakpointsMap, breakVal: string) =>
  breaks[breakVal]
    ? Right(breaks[breakVal])
    : Left(makeErrorMessage(breakVal, breaks));

export const eitherGetNextBreakName = (
  breaks: BreakpointsMap,
  breakName: string,
) => {
  const breakNames = getBreakNames(breaks);
  const penultimateBreakName = breakNames[breakNames.length - 2];
  const currPos = breakNames.indexOf(breakName);
  const isInvalidBreakName = currPos === -1;
  const isLastBreakName = currPos > -1 && currPos >= breakNames.length - 1;

  if (isInvalidBreakName) {
    return Left(makeErrorMessage(breakName, breaks));
  }

  if (isLastBreakName) {
    return Left(
      `Do not use '${breakName}' because it doesn't have a maximum width. Use '${penultimateBreakName}'.`,
    );
  }

  return Right(breakNames[currPos + 1]);
};

// Maximum breakpoint width. Null for the largest (last) breakpoint.
// The maximum value is calculated as the minimum of the next one less 0.02px
// to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
// See https://bugs.webkit.org/show_bug.cgi?id=178261
//
export const eitherGetNextBreakVal = (
  breaks: BreakpointsMap,
  breakName: string,
) => {
  const breakpointName = eitherGetNextBreakName(breaks, breakName).fold(
    errorReport,
    (x) => x,
  );

  return breaks[breakName]
    ? Right(`${parseFloat(breaks[breakpointName]) - 0.02}px`)
    : Left(makeErrorMessage(breakName, breaks));
};
