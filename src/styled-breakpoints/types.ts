export type Context = {
  theme: object | any;
};

export type Props = Context;

export type Orientation = 'portrait' | 'landscape';

export type MediaQueries = Record<string, string>;

export type Options = {
  browserContext?: number;
  pathToMediaQueries?: string[];
  errorPrefix?: string;
  defaultMediaQueries?: MediaQueries;
};

export type State = {
  browserContext: number;
  pathToMediaQueries: string[];
  errorPrefix: string;
  defaultMediaQueries: MediaQueries;
};

export type PrivateMethods = {
  invariant: (x: unknown, y: string) => void;
  throwInvalidBreakValue: (x: MediaQueries) => void;
  throwIsInvalidBreakName: (x: string, y: MediaQueries) => void;
  throwIsLastBreak: (x: string, y: MediaQueries) => void;
  throwIsInvalidNextBreakValue: (x: string, y: MediaQueries) => void;
  throwIsInvalidOrientation: (x: string) => void;
  withOrientationOrNot: (x: string, y?: string) => string;
  toEm: (x: string) => string;
  getBreakpointsFromTheme: (x: object) => MediaQueries;
  getNextBreakpointName: (x: string) => (y: MediaQueries) => string;
  getNextBreakpointValue: (x: string, y: MediaQueries) => string;
  getBreakpointValue: (x: string, y: MediaQueries) => string;
  calcMinWidth: (x: string, y: object) => string;
  calcMaxWidth: (x: string, y: object) => string;
};

export type PublicMethods = {
  up: (x: string, y?: Orientation) => (z: Context) => string;
  down: (x: string, y?: Orientation) => (z: Context) => string;
  between: (a: string, b: string, c?: Orientation) => (d: Context) => string;
  only: (x: string, y?: Orientation) => (z: Context) => string;
};

export type StyledBreakpoints = State & PrivateMethods & PublicMethods;
export type MakeStyledBreakpoints = (x?: Options) => StyledBreakpoints;

export type GetFn = <T>(x: string[], y: any, z?: T) => unknown | T;
export type MakeErrorMessage = (x: string, y: MediaQueries) => string;
