export interface CreateBreakpointsOptions {
  breakpoints: Record<string, string>;
  errorPrefix: string;
}

export declare function createBreakpoints(options: CreateBreakpointsOptions): {
  up: (min: string) => string;
  down: (max: string) => string;
  between: (min: string, max: string) => { min: string; max: string };
  only: (name: string) => { min: string; max: string };
};
