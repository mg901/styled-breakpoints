type Options = {
  breakpoints: Record<string, `${string}px`>;
  errorPrefix: string;
};

export declare function createBreakpoints(options: Options): {
  up: (min: string) => string;
  down: (max: string) => never | string;
  between: (
    min: string,
    max: string
  ) =>
    | never
    | {
        min: string;
        max: string;
      };
  only: (name: string) =>
    | {
        min: string;
        max: string;
      }
    | string;
};
