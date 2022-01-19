import { Orientation } from './styled-breakpoints';
export { createTheme } from './styled-breakpoints';

export declare function up(min: string, orientation?: Orientation): any;
export declare function down(max: string, orientation?: Orientation): any;
export declare function between(
  min: string,
  max: string,
  orientation?: Orientation
): any;
export declare function only(name: string, orientation?: Orientation): any;
