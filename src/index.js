import { css } from 'styled-components';
import { _toEm, _getNextBreakValue, _getBreakValue } from './helpers';

/**
 * Default media breakpoints
 * @type {Object}
 */
export const defaultBreakpoints = {
  mobile: '576px',
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
  const above = breakpointValue => (...args) => css`
    @media screen and (min-width: ${_toEm(
        _getBreakValue(breakpointValue, breakpoints),
      )}) {
      ${css(...args)};
    }
  `;

  const below = breakpointValue => (...args) => css`
    @media screen and (max-width: ${_toEm(
        _getNextBreakValue(breakpointValue, breakpoints),
      )}) {
      ${css(...args)};
    }
  `;

  const only = breakpointValue => (...args) => css`
    @media screen and (min-width: ${_toEm(
        _getBreakValue(breakpointValue, breakpoints),
      )}) and (max-width: ${_toEm(
        _getNextBreakValue(breakpointValue, breakpoints),
      )}) {
      ${css(...args)};
    }
  `;

  const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
    @media screen and (min-width: ${_toEm(
        _getBreakValue(firstBreakpoint, breakpoints),
      )}) and (max-width: ${_toEm(
        _getNextBreakValue(secondBreakpoint, breakpoints),
      )}) {
      ${css(...args)};
    }
  `;

  return { below, above, only, between };
};

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */
export default createBreakpoints();
