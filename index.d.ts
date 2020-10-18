export type Context = {
  theme: object | any;
};
export type Props = Context;
export type MediaQueries = Record<string, string>;

export type Options = {
  browserContext?: number;
  pathToMediaQueries?: string[];
  errorPrefix?: string;
  defaultMediaQueries?: MediaQueries;
};

type Orientation = 'portrait' | 'landscape';

export type PublicMethods = {
  up: (x: string, y?: Orientation) => (z: Context) => string;
  down: (x: string, y?: Orientation) => (z: Context) => string;
  between: (a: string, b: string, c?: Orientation) => (d: Context) => string;
  only: (x: string, y?: Orientation) => (z: Context) => string;
};

export type MakeStyledBreakpoints = (x?: Options) => PublicMethods;
