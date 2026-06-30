import type { Config, Values } from '../create-theme/types';

import { createStyledBreakpointsTheme } from '../create-theme';
import type { DEFAULT_BREAKPOINT_VALUES } from '../create-theme/default-breakpoint-values';
import { withBreakpointValidation } from './breakpoints-validation';
import { validateConfig } from './config-validation';

const DEFAULT_ERROR_PREFIX = `[styled-breakpoints] › `;

export const withValidation =
  (createTheme: typeof createStyledBreakpointsTheme) =>
  <const T extends Values = typeof DEFAULT_BREAKPOINT_VALUES>({
    errorPrefix = DEFAULT_ERROR_PREFIX,
    ...config
  }: Config<T> = {}) => {
    const hasConfig = Object.keys(config).length > 0;

    if (hasConfig) {
      validateConfig<T>(errorPrefix, config);
    }

    return withBreakpointValidation(errorPrefix, createTheme(config));
  };
