export const up =
  (min, orientation) =>
  ({ theme }) =>
    theme.breakpoints.up(min, orientation);

export const down =
  (max, orientation) =>
  ({ theme }) =>
    theme.breakpoints.down(max, orientation);

export const between =
  (min, max, orientation) =>
  ({ theme }) =>
    theme.breakpoints.between(min, max, orientation);

export const only =
  (key, orientation) =>
  ({ theme }) =>
    theme.breakpoints.only(key, orientation);
