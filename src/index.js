// @flow

import { calcMinWidthInPx, calcMaxWidthInPx } from './calculators';
import { widthMinMedia, withMaxMedia, widthMinAndMaxMedia } from './HOFs';
import type { CustomTheme } from './models';

type CreateAbove = (string) => (CustomTheme) => string;
export const createAbove: CreateAbove = (breakName) => (breaks) =>
  widthMinMedia(calcMinWidthInPx(breaks, breakName));

type CreateBelow = (string) => (CustomTheme) => string;
export const createBelow: CreateBelow = (breakName) => (breaks) =>
  withMaxMedia(calcMaxWidthInPx(breaks, breakName));

type CreateBetween = (string, string) => (CustomTheme) => string;
export const createBetween: CreateBetween = (minBreak, maxBreak) => (breaks) =>
  widthMinAndMaxMedia(
    calcMinWidthInPx(breaks, minBreak),
    calcMaxWidthInPx(breaks, maxBreak),
  );

type CreateOnly = (string) => (CustomTheme) => string;
export const createOnly: CreateOnly = (breakName) => (breaks) =>
  widthMinAndMaxMedia(
    calcMinWidthInPx(breaks, breakName),
    calcMaxWidthInPx(breaks, breakName),
  );

export const up = createAbove;
export const down = createBelow;
export const between = createBetween;
export const only = createOnly;
