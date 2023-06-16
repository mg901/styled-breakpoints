import type { Orientation } from '../styled-breakpoints';

export declare function up(min: string, orientation?: Orientation): string;

export declare function down(max: string, orientation?: Orientation): string;

export declare function between(
  min: string,
  max: string,
  orientation?: Orientation
): string;

export function only(key: string, orientation?: Orientation): string;
