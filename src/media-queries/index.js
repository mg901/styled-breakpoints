// @flow

import { Right, Left } from 'igogo';
import { makeErrorMessage, getBreakNames, errorReport } from '../helpers';
import type { BreakpointsMap } from '../models';

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
  const isNotLastBreakName = currPos > -1 && currPos >= breakNames.length - 1;
  const result = Right(breakNames[currPos + 1]);

  if (isInvalidBreakName) {
    return Left(makeErrorMessage(breakName, breaks));
  }

  if (isNotLastBreakName) {
    return Left(
      `Do not use '${breakName}' because it doesn't have a maximum width. Use '${penultimateBreakName}'.`,
    );
  }

  return result;
};

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
