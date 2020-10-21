export type Context = {
  theme: object | any;
};
export type Props = Context;
export type MediaQueries = Record<string, string>;

type Orientation = 'portrait' | 'landscape';

export function up(x: string, y?: Orientation): (z: Context) => string;
export function down(x: string, y?: Orientation): (z: Context) => string;
export function between(
  a: string,
  b: string,
  c?: Orientation
): (d: Context) => string;

export function only(x: string, y?: Orientation): (z: Context) => string;
