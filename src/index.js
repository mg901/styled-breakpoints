// @flow

import { calcMinWidthInPx, calcMaxWidthInPx } from './calculators';
import { withMinMedia, withMaxMedia, withMinAndMaxMedia } from './HOFs';
import type { ThemeWithOptionalBreakpoints } from './models';

type Up = (string) => (ThemeWithOptionalBreakpoints) => ?string;
export const up: Up = (breakName) => (breaks) =>
  withMinMedia(
    calcMinWidthInPx(
      breakName,
      breaks.theme,
      breaks.theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );

type Down = (string) => (ThemeWithOptionalBreakpoints) => ?string;
export const down: Down = (breakName) => (breaks) =>
  withMaxMedia(
    calcMaxWidthInPx(
      breakName,
      breaks.theme,
      breaks.theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );

type Between = (string, string) => (ThemeWithOptionalBreakpoints) => ?string;
export const between: Between = (minBreak, maxBreak) => (breaks) =>
  withMinAndMaxMedia(
    calcMinWidthInPx(
      minBreak,
      breaks.theme,
      breaks.theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
    calcMaxWidthInPx(
      maxBreak,
      breaks.theme,
      breaks.theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );

type Only = (string) => (ThemeWithOptionalBreakpoints) => ?string;
export const only: Only = (breakName) => (breaks) =>
  withMinAndMaxMedia(
    calcMinWidthInPx(
      breakName,
      breaks.theme,
      breaks.theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
    calcMaxWidthInPx(
      breakName,
      breaks.theme,
      breaks.theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );
