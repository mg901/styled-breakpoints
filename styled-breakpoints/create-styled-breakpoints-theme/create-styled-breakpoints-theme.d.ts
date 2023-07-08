export type Orientation = 'portrait' | 'landscape';

type BreakpointKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type Min = BreakpointKeys;

type Max = Exclude<BreakpointKeys, 'xs'>;

type Up = (min: Min, orientation?: Orientation) => string;
type Down = (max: Max, orientation?: Orientation) => string;
type Between = (min: Min, max: Max, orientation?: Orientation) => string;
type Only = (key: BreakpointKeys, orientation?: Orientation) => string;

interface Options {
  breakpoints?: Record<string, `${number}px`>;
  errorPrefix?: string;
}

export interface MediaQueries<T = Min, U = Max> {
  up: (min: T, orientation?: Orientation) => string;
  down: (max: U, orientation?: Orientation) => string;
  between: (min: T, max: U, orientation?: Orientation) => string;
  only: (key: T, orientation?: Orientation) => string;
}

export interface StyledBreakpointsTheme<T = MediaQueries> {
  breakpoints: T;
}

export function createStyledBreakpointsTheme(options?: Options): any;
