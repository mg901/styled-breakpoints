import { describe, expect, it } from 'vitest';
import { DEFAULT_BREAKPOINTS as config } from '../constants.js';
import { upperBounds } from '../test-utils.js';
import { createBreakpointMap } from './create-breakpoints-map.js';

describe('createBreakpoints', () => {
  const map = createBreakpointMap(config);

  it('returns map for default breakpoints', () => {
    expect(map).toEqual({
      xs: {
        min: config.xs,
        max: null,
        end: upperBounds.sm,
      },
      sm: {
        min: config.sm,
        max: upperBounds.sm,
        end: upperBounds.md,
      },
      md: {
        min: config.md,
        max: upperBounds.md,
        end: upperBounds.lg,
      },
      lg: {
        min: config.lg,
        max: upperBounds.lg,
        end: upperBounds.xl,
      },
      xl: {
        min: config.xl,
        max: upperBounds.xl,
        end: upperBounds.xxl,
      },
      xxl: {
        min: config.xxl,
        max: upperBounds.xxl,
        end: null,
      },
    });
  });
});
