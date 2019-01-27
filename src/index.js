// @flow

import { calcMinWidthInPx, calcMaxWidthInPx } from './calculators';
import { withMinMedia, withMaxMedia, withMinAndMaxMedia } from './HOFs';
import type { ThemeWithCustomBreakpoints } from './models';

type Up = (string) => (ThemeWithCustomBreakpoints) => string;
export const up: Up = (breakName) => ({ theme }) =>
  withMinMedia(
    calcMinWidthInPx(
      breakName,
      theme,
      theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );

type Down = (string) => (ThemeWithCustomBreakpoints) => string;
export const down: Down = (breakName) => ({ theme }) =>
  withMaxMedia(
    calcMaxWidthInPx(
      breakName,
      theme,
      theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );

type Between = (string, string) => (ThemeWithCustomBreakpoints) => string;
export const between: Between = (minBreak, maxBreak) => ({ theme }) =>
  withMinAndMaxMedia(
    calcMinWidthInPx(
      minBreak,
      theme,
      theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
    calcMaxWidthInPx(
      maxBreak,
      theme,
      theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );

type Only = (string) => (ThemeWithCustomBreakpoints) => string;
export const only: Only = (breakName) => ({ theme }) =>
  withMinAndMaxMedia(
    calcMinWidthInPx(
      breakName,
      theme,
      theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
    calcMaxWidthInPx(
      breakName,
      theme,
      theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );
