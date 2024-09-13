type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer R) => void
  ? R
  : never;

type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R
    ? R
    : never;

type UnionToTuple<T, Last = LastOf<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, Last>>, Last];

type TailOfTuple<T extends any[]> = T extends [infer _, ...infer Tail]
  ? Tail
  : never;

type TailOfUnion<T> = TailOfTuple<UnionToTuple<T>>[number];

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
