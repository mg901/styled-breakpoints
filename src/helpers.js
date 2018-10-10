const BROWSER_DEFAULT_FONT_SIZE = 16;
export const pixelsToEm = inPx =>
  `${parseFloat(inPx) / BROWSER_DEFAULT_FONT_SIZE}em`;

const getNextBreakName = (breakpointValue, breakpoints) => {
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

export const getNextBreakValue = (breakpointValue, breakpoints = {}) => {
  let result = null;

  try {
    const breakName = getNextBreakName(breakpointValue, breakpoints);
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

export const getBreakValue = (breakpointValue, breakpoints = {}) => {
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
