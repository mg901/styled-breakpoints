import { _toEm, _getNextBreakValue, _getBreakValue } from './helpers';

/**
 * Default media breakpoints
 * @type {Object}
 */
export const defaultBreakpoints = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

/**
 * Media query generator
 * @param {Object} breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export const createBreakpoints = (breakpoints = defaultBreakpoints) => {
  const above = createAbove(breakpoints);
  const below = createBelow(breakpoints);
  const only = createOnly(breakpoints);
  const between = createBetween(breakpoints);

  return { below, above, only, between };
};

const createAbove = breakpointsMap => breakpointKey => {
  const pixels = _toEm(_getBreakValue(breakpointKey, breakpointsMap));
  return `@media screen and (min-width: ${pixels})`;
};

const createBelow = breakpointsMap => breakpointKey => {
  const pixels = _toEm(_getNextBreakValue(breakpointKey, breakpointsMap));
  return `@media screen and (max-width: ${pixels})`;
}

const createOnly = breakpointsMap => breakpointKey => {
  const minPixels = _toEm(_getBreakValue(breakpointKey, breakpointsMap));
  const maxPixels = _toEm(_getNextBreakValue(breakpointKey, breakpointsMap));
  return `@media screen and (min-width: ${minPixels}) and (max-width: ${maxPixels})`;
}

const createBetween = breakpointsMap => (fromBp, toBp) => {
  const fromPixels = _toEm(_getBreakValue(fromBp, breakpointsMap));
  const toPixels = _toEm(_getNextBreakValue(toBp, breakpointsMap));
  return `@media screen and (min-width: ${fromPixels}) and (max-width: ${toPixels})`;
}

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */
export default createBreakpoints();
