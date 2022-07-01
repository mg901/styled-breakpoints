import { CreateBreakpointsOptions } from '../core';

export type Orientation = 'portrait' | 'landscape';

export interface CreateStyledBreakpointsOptions
  extends CreateBreakpointsOptions {
  pathToMediaQueries: string;
}

export declare function createStyledBreakpoints(
  options?: CreateStyledBreakpointsOptions
): {
  up: (min: string, orientation?: Orientation) => any;
  down: (max: string, orientation?: Orientation) => any;
  between: (min: string, max: string, orientation?: Orientation) => any;
  only: (name: string, orientation?: Orientation) => any;
};

export declare function createTheme<T extends Record<string, string>>(
  breakpoints: T
): {
  ['styled-breakpoints']: { breakpoints: T };
};
