// @flow

import { calcMinWidthInPx, calcMaxWidthInPx } from './calculators';
import { withMinMedia, withMaxMedia, widthMinAndMaxMedia } from './HOFs';

import { type CustomTheme } from './models';

type Up = (string) => (CustomTheme) => string;
export const up: Up = (breakName) => (breaks) =>
  withMinMedia(calcMinWidthInPx(breaks, breakName));

type Down = (string) => (CustomTheme) => string;
export const down: Down = (breakName) => (breaks) =>
  withMaxMedia(calcMaxWidthInPx(breaks, breakName));

type Between = (string, string) => (CustomTheme) => string;
export const between: Between = (minBreak, maxBreak) => (breaks) =>
  widthMinAndMaxMedia(
    calcMinWidthInPx(breaks, minBreak),
    calcMaxWidthInPx(breaks, maxBreak),
  );

type Only = (string) => (CustomTheme) => string;
export const only: Only = (breakName) => (breaks) =>
  widthMinAndMaxMedia(
    calcMinWidthInPx(breaks, breakName),
    calcMaxWidthInPx(breaks, breakName),
  );
