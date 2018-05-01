import { css } from 'styled-components';
import { toEm, toRem } from './convertors';

export { toEm, toRem };

/**
 * Default media breakpoints
 * @type {Object}
 */
export const defaultBreakpoints = {
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
};

export const _getSizeFromBreakpoint = (breakpointValue, breakpoints = {}) => {
  let result = null;
  if (breakpoints[breakpointValue]) {
    result = breakpoints[breakpointValue];
  } else if (parseInt(breakpointValue, 10)) {
    result = breakpointValue;
  } else {
    console.error(
      'styled-breakpoints: No valid breakpoint or size specified for media.',
    );
    result = '0';
  }

  return result;
};

/**
 * Media query generator
 * @param {Object} breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export const generateMedia = (breakpoints = defaultBreakpoints) => {
  const below = breakpoint => (...args) => css`
    @media (max-width: ${_getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)};
    }
  `;

  const above = breakpoint => (...args) => css`
    @media (min-width: ${_getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)};
    }
  `;

  const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
    @media (min-width: ${_getSizeFromBreakpoint(
        firstBreakpoint,
        breakpoints,
      )}) and (max-width: ${_getSizeFromBreakpoint(
        secondBreakpoint,
        breakpoints,
      )}) {
      ${css(...args)};
    }
  `;

  const oldStyle = Object.keys(breakpoints).reduce(
    (acc, label) => {
      const size = breakpoints[label];

      acc.to[label] = (...args) => {
        console.warn(
          `styled-breakpoints: Use media.below('${label}') instead of old media.to.${label} (Probably we'll deprecate it)`,
        );
        return css`
          @media (max-width: ${size}) {
            ${css(...args)};
          }
        `;
      };

      acc.from[label] = (...args) => {
        console.warn(
          `styled-breakpoints: Use media.above('${label}') instead of old media.from.${label} (Probably we'll deprecate it)`,
        );
        return css`
          @media (min-width: ${size}) {
            ${css(...args)};
          }
        `;
      };

      return acc;
    },
    { to: {}, from: {} },
  );

  return { ...oldStyle, below, above, between };
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
