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

export declare function up(
  minWidth: string,
  orientation?: Orientation
): any

export declare function down(
  maxWidth: string,
  orientation?: Orientation
): any

export declare function between(
  minWidth: string,
  maxWidth: string,
  orientation?: Orientation
): any

export declare function only(
  minWidth: string,
  orientation?: Orientation
): any

export declare function makeStyledBreakpoints(
  options?: Options
): {
  up: typeof up;
  down: typeof down;
  between: typeof between;
  only: typeof only;
};
