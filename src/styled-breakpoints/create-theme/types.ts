import type { DEFAULT_BREAKPOINT_VALUES } from './default-breakpoint-values';

export type Values = Record<string, `${number}px`>;

export type Orientation = 'landscape' | 'portrait';

export type BreakpointsValues<T extends Values> = {
  values: T;
};

export type Breakpoints<T extends Values> = {
  breakpoints: BreakpointsValues<T>;
};

export type Config<T extends Values> = {
  errorPrefix?: string;
  breakpoints?: BreakpointsValues<T>;
};

export type ThemeBreakpoints<T> = Readonly<{
  keys: readonly string[];
  up: (min: keyof T & string, orientation?: Orientation) => string;
  down: (max: keyof T & string, orientation?: Orientation) => string;
  between: (
    min: keyof T & string,
    max: keyof T & string,
    orientation?: Orientation
  ) => string;
  only: (key: keyof T & string, orientation?: Orientation) => string;
}>;

export type StyledBreakpointsTheme<
  T extends Values = typeof DEFAULT_BREAKPOINT_VALUES,
> = Readonly<{
  breakpoints: ThemeBreakpoints<T>;
}>;
