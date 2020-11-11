export type Props = {
  theme: object | any;
};

export type Orientation = 'portrait' | 'landscape';

export type MediaQueries = Record<string, string>;

export type Options = {
  browserContext?: number;
  pathToMediaQueries?: string[];
  errorPrefix?: string;
  defaultMediaQueries?: MediaQueries;
};

export declare function makeStyledBreakpoints(
  options?: Options
): {
  up: (minWidth: string, orientation?: Orientation) => (props: Props) => string;
  down: (
    maxWidth: string,
    orientation?: Orientation
  ) => (props: Props) => string;
  between: (
    minWidth: string,
    maxWidth: string,
    orientation?: Orientation
  ) => (props: Props) => string;
  only: (
    minWidth: string,
    orientation?: Orientation
  ) => (props: Props) => string;
};
