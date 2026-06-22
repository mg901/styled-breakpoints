import { createBreakpointMap as factory } from './create-breakpoints-map.js';
import { withValidation } from './validation.js';
import { isProd } from '../constants.js';

export const createBreakpointMap = isProd ? factory : withValidation(factory);
