/* istanbul ignore file */
import { createBreakpoints as prod } from './index.prod.js';
import { createBreakpoints as dev } from './index.dev.js';

const createBreakpoints = process.env.NODE_ENV === 'production' ? prod : dev;

export { createBreakpoints };
