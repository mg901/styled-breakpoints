import type {
  Breakpoints,
  Config,
  StyledBreakpointsTheme,
  ThemeBreakpoints,
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
  const T extends Values = typeof DEFAULT_BREAKPOINT_VALUES,
>(
  config?: Config<T>
): StyledBreakpointsTheme<T> => {
  const { keys, ranges } = buildBreakpointsMap<T>(withDefaults<T>(config));

  const up: ThemeBreakpoints<T>['up'] = (min, orientation) =>
    buildMediaQuery(ranges[min].min, null, orientation);

  const down: ThemeBreakpoints<T>['down'] = (max, orientation) =>
    buildMediaQuery(null, ranges[max].max, orientation);

  const between: ThemeBreakpoints<T>['between'] = (min, max, orientation) =>
    buildMediaQuery(ranges[min].min, ranges[max].max, orientation);

  const only: ThemeBreakpoints<T>['only'] = (key, orientation) =>
    buildMediaQuery(ranges[key].min, ranges[key].end, orientation);

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
