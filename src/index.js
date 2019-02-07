// @flow

import { calcMinWidthInPx, calcMaxWidthInPx } from './calculators';
import { withMinMedia, withMaxMedia, withMinAndMaxMedia } from './HOFs';
import type { BpProps } from './models';

export type { BpProps } from './models';

type Up = (string) => (BpProps) => string;
export const up: Up = (breakName) => ({ theme }) =>
  withMinMedia(
    calcMinWidthInPx(
      breakName,
      theme,
      theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );

type Down = (string) => (BpProps) => string;
export const down: Down = (breakName) => ({ theme }) =>
  withMaxMedia(
    calcMaxWidthInPx(
      breakName,
      theme,
      theme.ERROR_PREFIX_FOR_STYLED_BREAKPOINTS,
    ),
  );

type Between = (string, string) => (BpProps) => string;
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

type Only = (string) => (BpProps) => string;
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
