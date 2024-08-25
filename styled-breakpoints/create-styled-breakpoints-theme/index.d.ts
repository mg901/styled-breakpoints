type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R
    ? R
    : never;

type TuplifyUnion<T, Last = LastOf<T>> = [T] extends [never]
  ? []
  : [...TuplifyUnion<Exclude<T, Last>>, Last];

type TailOfTuple<T extends any[]> = T extends [infer _, ...infer Tail]
  ? Tail
  : never;

type TailOfUnion<T> = TailOfTuple<TuplifyUnion<T>>[number];

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
    TailOfUnion<Keys> = TailOfUnion<DefaultBreakpointKeys>,
>(options?: Options<T>): StyledBreakpointsTheme<Keys, KeysWithoutFirst>;
