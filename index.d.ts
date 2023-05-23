type Orientation = 'portrait' | 'landscape';

export type Up = (min: string, orientation?: Orientation) => string;
export type Down = (max: string, orientation?: Orientation) => string;

export type Between = (
  min: string,
  max: string,
  orientation?: Orientation
) => string;

export type Only = (key: string, orientation?: Orientation) => string;

export interface StyledBreakpoints {
  up: Up;
  down: Down;
  between: Between;
  only: Only;
}

export interface StyledBreakpointsTheme {
  breakpoints: StyledBreakpoints;
}

interface Options {
  breakpoints?: Record<string, `${number}px`>;
  errorPrefix?: string;
}

declare function createStyledBreakpointsTheme(
  options?: Options
): StyledBreakpointsTheme;
