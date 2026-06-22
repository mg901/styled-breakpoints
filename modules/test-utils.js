import { DEFAULT_BREAKPOINTS } from './constants.js';

const toMax = (value) => `${parseInt(value, 10) - 0.02}px`;

export const upperBounds = Object.fromEntries(
  Object.entries(DEFAULT_BREAKPOINTS).map(([k, v]) => [k, toMax(v)])
);
