import { Orientation, Props } from './core';

export declare function up(
  minWidth: string,
  orientation?: Orientation
): (props: Props) => string;

export declare function down(
  maxWidth: string,
  orientation?: Orientation
): (props: Props) => string;

export declare function between(
  minWidth: string,
  maxWidth: string,
  orientation?: Orientation
): (props: Props) => string;

export declare function only(
  minWidth: string,
  orientation?: Orientation
): (props: Props) => string;
