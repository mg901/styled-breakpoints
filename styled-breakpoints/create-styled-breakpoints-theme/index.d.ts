/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
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
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

/**
 * HeadlessTuple<[1, 2]> = [1]
 */
type HeadlessTuple<T extends any[]> = T extends [infer _, ...infer Tail]
  ? Tail
  : never;

/**
 * OmitFirstInUnion<1 | 2> = 1
 */
export type OmitFirstInUnion<T> = HeadlessTuple<UnionToTuple<T>>[number];

export type Breakpoints = Record<string, `${string}px`>;
export type ErrorPrefix = `[${string}]: `;

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
    up(min: Min, orientation?: 'portrait' | 'landscape'): string;
    down(max: Max, orientation?: 'portrait' | 'landscape'): string;
    between(min: Min, max: Max, orientation?: 'portrait' | 'landscape'): string;
    only(key: Min, orientation?: 'portrait' | 'landscape'): string;
  };
}

export function createStyledBreakpointsTheme<
  T extends Breakpoints = DefaultBreakpoints,
  Keys extends keyof T = DefaultBreakpointKeys,
  KeysWithoutFirst extends
    OmitFirstInUnion<Keys> = OmitFirstInUnion<DefaultBreakpointKeys>,
>(options?: Options<T>): StyledBreakpointsTheme<Keys, KeysWithoutFirst>;
