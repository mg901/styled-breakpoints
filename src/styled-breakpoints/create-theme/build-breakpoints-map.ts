import type { DEFAULT_BREAKPOINT_VALUES } from './default-breakpoint-values';
import type { Breakpoints, Values } from './types';

type Range = {
  min: string;
  max: string | null;
  end: string | null;
};

type Ranges<T extends Values> = Record<keyof T & string, Range>;

type BreakpointsMap<T extends Values = typeof DEFAULT_BREAKPOINT_VALUES> =
  Readonly<{
    keys: readonly string[];
    ranges: Ranges<T>;
  }>;

/**
 * Why subtract .02px?
 * Browsers don’t currently support range context queries,
 * See: https://www.w3.org/TR/mediaqueries-4/#range-context
 *
 * so we work around the limitations of min- and max- prefixes and viewports with fractional widths
 * (which can occur under certain conditions on high-dpi devices, for instance)
 * by using values with higher precision.
 *
 * See: https://www.w3.org/TR/mediaqueries-4/#mq-min-max
 *
 */
const toUpperBound = (x: number): number => x - 0.02;

export const buildBreakpointsMap = <
  T extends Values = typeof DEFAULT_BREAKPOINT_VALUES,
>({
  breakpoints: { values },
}: Breakpoints<T>): BreakpointsMap<T> => {
  const unit = 'px';

  const sorted = Object.entries<string>(values)
    .map<[string, number]>(([key, val]) => [key, parseInt(val, 10)])
    .sort(([, a], [, b]) => a - b);

  const entries = sorted.map(([key, value], i, arr) => {
    const next = arr[i + 1];
    const nextVal = next?.[1];

    return [
      key,
      {
        min: value + unit,
        max: value === 0 ? null : toUpperBound(value) + unit,
        end: nextVal ? toUpperBound(nextVal) + unit : null,
      },
    ];
  });

  return {
    keys: sorted.map(([key]) => key),
    ranges: Object.fromEntries(entries),
  };
};
