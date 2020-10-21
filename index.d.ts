export type Props = {
  theme: object | any;
};
export type MediaQueries = Record<string, string>;

type Orientation = 'portrait' | 'landscape';

export function up(x: string, y?: Orientation): (z: Props) => string;
export function down(x: string, y?: Orientation): (z: Props) => string;
export function between(
  a: string,
  b: string,
  c?: Orientation
): (d: Props) => string;

export function only(x: string, y?: Orientation): (z: Props) => string;
