// @flow

import { calcMinWidthInPx, calcMaxWidthInPx } from './calculators';
import { withMinMedia, withMaxMedia, widthMinAndMaxMedia } from './HOFs';
import type { ThemeWithOptionalBreakpoints } from './models';

type Up = (string) => (ThemeWithOptionalBreakpoints) => ?string;
export const up: Up = (breakName) => (breaks) =>
  withMinMedia(calcMinWidthInPx(breakName, breaks.theme));

type Down = (string) => (ThemeWithOptionalBreakpoints) => ?string;
export const down: Down = (breakName) => (breaks) =>
  withMaxMedia(calcMaxWidthInPx(breakName, breaks.theme));

type Between = (string, string) => (ThemeWithOptionalBreakpoints) => ?string;
export const between: Between = (minBreak, maxBreak) => (breaks) =>
  widthMinAndMaxMedia(
    calcMinWidthInPx(minBreak, breaks.theme),
    calcMaxWidthInPx(maxBreak, breaks.theme),
  );

type Only = (string) => (ThemeWithOptionalBreakpoints) => ?string;
export const only: Only = (breakName) => (breaks) =>
  widthMinAndMaxMedia(
    calcMinWidthInPx(breakName, breaks.theme),
    calcMaxWidthInPx(breakName, breaks.theme),
  );
