import type { Config } from '../create-theme/types';

import { createStyledBreakpointsTheme } from '../create-theme';
import type { DEFAULT_BREAKPOINT_VALUES } from '../create-theme/default-breakpoint-values';
import { withBreakpointValidation } from './breakpoints-validation';
import { validateConfig } from './config-validation';

const DEFAULT_ERROR_PREFIX = `[styled-breakpoints] › `;

/**
 * Two things below are deliberate and must stay: the constraint is spelled out
 * instead of reusing `Values`, and the return type is left inferred instead of
 * annotated with `StyledBreakpointsTheme<T>`. Together they keep the generated
 * .d.ts fully expanded, so callers read the accepted config shape and the
 * returned API in their editor instead of a chain of alias names.
 */
export const withValidation =
  (createTheme: typeof createStyledBreakpointsTheme) =>
  <
    const T extends Record<string, `${number}px`> =
      typeof DEFAULT_BREAKPOINT_VALUES,
  >({ errorPrefix = DEFAULT_ERROR_PREFIX, ...config }: Config<T> = {}) => {
    const hasConfig = Object.keys(config).length > 0;

    if (hasConfig) {
      validateConfig<T>(errorPrefix, config);
    }

    return withBreakpointValidation(errorPrefix, createTheme(config));
  };
