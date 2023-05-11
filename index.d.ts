type Orientation = 'portrait' | 'landscape';
export type Breakpoints = Record<string, `${string}px`>;

declare enum DefaultBreakpoints {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
}

type BreakpointKeys = typeof DefaultBreakpoints;
type Max = keyof Omit<BreakpointKeys, 'xs'>;

export type Up = (min: BreakpointKeys, orientation?: Orientation) => string;
export type Down = (max: Max, orientation?: Orientation) => string;
export type Between = (
  min: BreakpointKeys,
  max: Max,
  orientation?: Orientation
) => string;
export type Only = (name: BreakpointKeys, orientation?: Orientation) => string;

export interface DefaultStyledBreakpointsTheme {
  breakpoints: {
    up: Up;
    down: Down;
    between: Between;
    only: Only;
  };
}

interface Options {
  breakpoints?: Breakpoints;
  errorPrefix?: string;
}

declare function createStyledBreakpointsTheme(
  options: Options
): DefaultStyledBreakpointsTheme;
