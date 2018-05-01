import { css } from 'styled-components';
import { toRem } from './convertors';

export { toRem };

const BROWSER_DEFAULT_FONT_SIZE = 16;
const toEm = inPx => `${parseFloat(inPx) / BROWSER_DEFAULT_FONT_SIZE}em`;

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

const _getNextBreakName = (breakpointValue, breakpoints) => {
  const namesOfBreakpoins = Object.keys(breakpoints);
  const penultimateBreakName = namesOfBreakpoins[namesOfBreakpoins.length - 2];
  const currentPosition = namesOfBreakpoins.indexOf(breakpointValue);

  try {
    if (currentPosition < namesOfBreakpoins.length - 1) {
      const nextBreak = currentPosition + 1;
      return namesOfBreakpoins[`${nextBreak}`];
    }
    throw new Error(
      `"styled-breakpoints: ${breakpointValue}" is incorrect value. Use ${penultimateBreakName}.`,
    );
  } catch (err) {
    console.warn(err);
  }
};

const _getNextBreakValue = (breakpointValue, breakpoints = {}) => {
  let result = null;

  try {
    const breakName = _getNextBreakName(breakpointValue, breakpoints);
    if (breakpoints[breakpointValue]) {
      result = `${parseFloat(breakpoints[breakName]) - 0.02}px`;
    } else if (parseInt(breakpointValue, 10)) {
      result = `${Number(breakpointValue) - 0.02}`;
    } else {
      throw new Error(
        `styled-breakpoints: ${breakpointValue} no valid breakpoint or size specified for media.`,
      );
    }
  } catch (err) {
    console.warn(err);
  }

  return result;
};

export const _getBreakValue = (breakpointValue, breakpoints = {}) => {
  let result = null;

  try {
    if (breakpoints[breakpointValue]) {
      result = breakpoints[breakpointValue];
    } else if (parseInt(breakpointValue, 10)) {
      result = breakpointValue;
    } else {
      throw new Error(
        'styled-breakpoints: No valid breakpoint or size specified for media.',
      );
    }
  } catch (err) {
    console.warn(err);
  }

  return result;
};

/**
 * Media query generator
 * @param {Object} breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export const generateMedia = (breakpoints = defaultBreakpoints) => {
  const above = breakpointValue => (...args) => css`
    @media screen and (min-width: ${toEm(
        _getBreakValue(breakpointValue, breakpoints),
      )}) {
      ${css(...args)};
    }
  `;

  const below = breakpointValue => (...args) => css`
    @media screen and (max-width: ${toEm(
        _getNextBreakValue(breakpointValue, breakpoints),
      )}) {
      ${css(...args)};
    }
  `;

  const only = breakpointValue => (...args) => css`
    @media screen and (min-width: ${toEm(
        _getBreakValue(breakpointValue, breakpoints),
      )}) and (max-width: ${toEm(
        _getNextBreakValue(breakpointValue, breakpoints),
      )}) {
      ${css(...args)};
    }
  `;

  const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
    @media screen and (min-width: ${toEm(
        _getBreakValue(firstBreakpoint, breakpoints),
      )}) and (max-width: ${toEm(
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
export default generateMedia();

/**
 * Usage: styled.div` ${media.from.medium`background: #000;`} `;
 * With this code, background for small and medium sizes will be `default` and for more than medium, will be `#000`
 */
