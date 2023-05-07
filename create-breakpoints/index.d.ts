export interface CreateBreakpointsOptions {
  breakpoints: Record<string, string>;
  errorPrefix: string;
}

type ComputedBreakpoint = `${string}px`;

export declare function createBreakpoints(options: CreateBreakpointsOptions): {
  up: (min: string) => ComputedBreakpoint;
  down: (max: string) => ComputedBreakpoint;
  between: (
    min: string,
    max: string
  ) => {
    min: ComputedBreakpoint;
    max: ComputedBreakpoint;
  };
  only: (name: string) =>
    | {
        min: ComputedBreakpoint;
        max: ComputedBreakpoint;
      }
    | ComputedBreakpoint;
};
