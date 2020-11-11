import { up, down, between, only } from '../core';

type Breakpoint = typeof up | typeof down | typeof between | typeof only;

export declare function useBreakpoint(breakpoint: Function): boolean;
