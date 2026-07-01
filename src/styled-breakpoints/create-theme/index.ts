import type {
  Breakpoints,
  Config,
  StyledBreakpointsTheme,
  Values,
} from './types';

import { buildBreakpointsMap } from './build-breakpoints-map';
import { buildMediaQuery } from './build-media-query';
import { DEFAULT_BREAKPOINT_VALUES } from './default-breakpoint-values';

const defaultConfig = {
  breakpoints: {
    values: DEFAULT_BREAKPOINT_VALUES,
  },
};

const withDefaults = <T extends Values>(config?: Config<T>) =>
  ({
    ...defaultConfig,
    ...config,
    breakpoints: {
      ...defaultConfig.breakpoints,
      ...(config?.breakpoints ?? {}),
    },
  }) as Breakpoints<T>;

export const createStyledBreakpointsTheme = <
  const T extends Record<string, `${number}px`> =
    typeof DEFAULT_BREAKPOINT_VALUES,
>(
  config?: Config<T>
): StyledBreakpointsTheme<T> => {
  const { keys, ranges } = buildBreakpointsMap<T>(withDefaults<T>(config));

  const up = (min: keyof T & string, orientation?: 'landscape' | 'portrait') =>
    buildMediaQuery(ranges[min].min, null, orientation);

  const down = (
    max: keyof T & string,
    orientation?: 'landscape' | 'portrait'
  ) => buildMediaQuery(null, ranges[max].max, orientation);

  const between = (
    min: keyof T & string,
    max: keyof T & string,
    orientation?: 'landscape' | 'portrait'
  ) => buildMediaQuery(ranges[min].min, ranges[max].max, orientation);

  const only = (
    key: keyof T & string,
    orientation?: 'landscape' | 'portrait'
  ) => buildMediaQuery(ranges[key].min, ranges[key].end, orientation);

  return {
    breakpoints: {
      keys,
      up,
      down,
      between,
      only,
    },
  };
};
