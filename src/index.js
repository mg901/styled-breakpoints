// @flow

import { calcMinWidthInPx, calcMaxWidthInPx } from './calculators';
import { withMinMedia, withMaxMedia, widthMinAndMaxMedia } from './HOFs';

import { type CustomTheme } from './models';

type Up = (string) => (CustomTheme) => string;
export const up: Up = (breakName) => (theme) =>
  withMinMedia(calcMinWidthInPx(theme, breakName));

type Down = (string) => (CustomTheme) => string;
export const down: Down = (breakName) => (theme) =>
  withMaxMedia(calcMaxWidthInPx(theme, breakName));

type Between = (string, string) => (CustomTheme) => string;
export const between: Between = (minBreak, maxBreak) => (theme) =>
  widthMinAndMaxMedia(
    calcMinWidthInPx(theme, minBreak),
    calcMaxWidthInPx(theme, maxBreak),
  );

type Only = (string) => (CustomTheme) => string;
export const only: Only = (breakName) => (theme) =>
  widthMinAndMaxMedia(
    calcMinWidthInPx(theme, breakName),
    calcMaxWidthInPx(theme, breakName),
  );
