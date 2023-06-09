type Options = {
  breakpoints: Record<string, `${string}px`>;
  errorPrefix: string;
};

type BreakpointsApi = Readonly<{
  keys: string[];
  lastKey: string;
  isFirstKey: (key: string) => boolean;
  getNextKey: (key: string) => string;
  up: (min: string) => string;
  down: (max: string) => string;
  between: (
    min: string,
    max: string
  ) => {
    min: string;
    max: string;
  };
  only: (key: string) =>
    | {
        min: string;
        max: string;
      }
    | string;
}>;

export declare function createBreakpointsApi(options: Options): BreakpointsApi;
