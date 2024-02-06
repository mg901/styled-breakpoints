type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> =
  UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
    x: infer L
  ) => 0
    ? L
    : never;

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

type HeadlessTuple<T extends any[]> = T extends [infer _, ...infer Tail]
  ? Tail
  : never;

export type OmitFirst<T> = HeadlessTuple<UnionToTuple<T>>[number];

export type Breakpoints = Record<string, `${string}px`>;
export type ErrorPrefix = `[${string}]: `;

export type Orientation = 'portrait' | 'landscape';

declare const DEFAULT_BREAKPOINTS: {
  readonly xs: '0px';
  readonly sm: '576px';
  readonly md: '768px';
  readonly lg: '992px';
  readonly xl: '1200px';
  readonly xxl: '1400px';
};

type DefaultBreakpoints = typeof DEFAULT_BREAKPOINTS;
type DefaultBreakpointKeys = keyof DefaultBreakpoints;

export type Options<T extends Breakpoints> = {
  breakpoints?: T;
  errorPrefix?: ErrorPrefix;
};

interface StyledBreakpointsTheme<Min, Max> {
  breakpoints: {
    up(min: Min, orientation?: Orientation): string;
    down(max: Max, orientation?: Orientation): string;
    between(min: Min, max: Max, orientation?: Orientation): string;
    only(key: Min, orientation?: Orientation): string;
  };
}

export function createStyledBreakpointsTheme<
  T extends Breakpoints = DefaultBreakpoints,
  Keys extends keyof T = DefaultBreakpointKeys,
  KeysWithoutFirst extends OmitFirst<Keys> = OmitFirst<DefaultBreakpointKeys>,
>(options?: Options<T>): StyledBreakpointsTheme<Keys, KeysWithoutFirst>;
