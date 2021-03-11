const { get, withMinAndMaxMedia, makeErrorMessage } = require('./library');

exports.makeStyledBreakpoints = (options) => {
  const _options = options || {};
  const state = {
    pathToMediaQueries: _options.pathToMediaQueries || ['breakpoints'],
    errorPrefix: _options.errorPrefix || '[styled-breakpoints]: ',
    defaultMediaQueries: _options.defaultMediaQueries || {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    browserContext: 16,

    invariant(condition, message) {
      if (!condition) {
        throw new Error(state.errorPrefix + message);
      }
    },
    throwInvalidBreakValue(breaks) {
      Object.keys(breaks).forEach((x) => {
        state.invariant(
          x.indexOf('px') !== -1,
          `Check your theme. '${breaks[x]}' is invalid breakpoint. Use pixels.`
        );
      });
    },
    throwIsInvalidBreakName(breakName, breaks) {
      state.invariant(breaks[breakName], makeErrorMessage(breakName, breaks));
    },
    throwIsLastBreak(breakName, breaks) {
      const names = Object.keys(breaks);
      const penultimateBreakName = names[names.length - 2];
      const isValid = names.indexOf(breakName) !== names.length - 1;

      state.invariant(
        isValid,
        `Don't use '${breakName}' because it doesn't have a maximum width. Use '${penultimateBreakName}'. See https://github.com/mg901/styled-breakpoints/issues/4 .`
      );
    },
    throwIsInvalidNextBreakValue(name, breaks) {
      state.invariant(
        breaks[name],
        `'${name}' is invalid breakpoint name. Use '${Object.keys(breaks)
          .slice(0, -1)
          .join(', ')}'.`
      );
    },
    throwIsInvalidOrientation(x) {
      state.invariant(
        x === 'portrait' || x === 'landscape',
        `'${x}' is invalid orientation. Use 'landscape' or 'portrait'.`
      );
    },
    withOrientationOrNot(breakpoint, orientation) {
      if (orientation) {
        state.throwIsInvalidOrientation(orientation);

        return `${breakpoint} and (orientation: ${orientation})`;
      }

      return breakpoint;
    },
    toEm(x) {
      return `${parseFloat(x) / state.browserContext}em`;
    },
    getBreakpointsFromTheme(theme = {}) {
      return get(state.pathToMediaQueries, theme, state.defaultMediaQueries);
    },
    getNextBreakpointName(name) {
      return (breaks) => {
        state.throwIsInvalidBreakName(name, breaks);
        state.throwIsLastBreak(name, breaks);

        const names = Object.keys(breaks);

        return names[names.indexOf(name) + 1];
      };
    },
    // Maximum breakpoint width. Null for the largest (last) breakpoint.
    // The maximum value is calculated as the minimum of the next one less 0.02px
    // to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
    // See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
    // Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
    // See https://bugs.webkit.org/show_bug.cgi?id=178261

    getNextBreakpointValue(name, breaks) {
      state.throwIsInvalidNextBreakValue(name, breaks);
      const getNextName = state.getNextBreakpointName(name);

      return `${parseFloat(breaks[getNextName(breaks)]) - 0.02}px`;
    },
    getBreakpointValue(name, breaks) {
      state.throwIsInvalidBreakName(name, breaks);

      return breaks[name];
    },
    calcMinWidth(name, theme) {
      return state.toEm(
        state.getBreakpointValue(name, state.getBreakpointsFromTheme(theme))
      );
    },
    calcMaxWidth(name, theme) {
      return state.toEm(
        state.getNextBreakpointValue(name, state.getBreakpointsFromTheme(theme))
      );
    },
    up(name, orientation) {
      return (props) =>
        state.withOrientationOrNot(
          `@media (min-width: ${state.calcMinWidth(name, props.theme)})`,
          orientation
        );
    },
    down(name, orientation) {
      return (props) =>
        state.withOrientationOrNot(
          `@media (max-width: ${state.calcMaxWidth(name, props.theme)})`,
          orientation
        );
    },
    between(min, max, orientation) {
      return (props) =>
        state.withOrientationOrNot(
          withMinAndMaxMedia(
            state.calcMinWidth(min, props.theme),
            state.calcMaxWidth(max, props.theme)
          ),
          orientation
        );
    },
    only(name, orientation) {
      return (props) =>
        state.withOrientationOrNot(
          withMinAndMaxMedia(
            state.calcMinWidth(name, props.theme),
            state.calcMaxWidth(name, props.theme)
          ),
          orientation
        );
    },
  };

  return state;
};
