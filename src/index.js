var DEFAULT_BREAKS_MAP = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

var invariant = function(condition, message) {
  if (!condition) {
    throw new Error('[styled-breakpoints]: ' + message);
  }
};

// withOrientationOrNot :: (String, ?String) -> String | Void
var withOrientationOrNot = function(params, orientation) {
  var isValidOrientation =
    orientation === 'portrait' || orientation === 'landscape';

  if (!orientation) return params;

  invariant(
    isValidOrientation,
    orientation + " is invalid orientation. Use 'landscape' or 'portrait'."
  );

  return params + ' and (orientation: ' + orientation + ')';
};

// withMinMedia :: String -> String
var withMinMedia = function(minWidth) {
  return '@media (min-width: ' + minWidth + ')';
};

// withMaxMedia :: String -> String
var withMaxMedia = function(maxWidth) {
  return '@media (max-width: ' + maxWidth + ')';
};

// withMinAndMaxMedia :: (String, String) -> String
var withMinAndMaxMedia = function(minWidth, maxWidth) {
  return (
    '@media (min-width: ' + minWidth + ') and (max-width: ' + maxWidth + ')'
  );
};

// isObject :: a -> Boolean
var isObject = function(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object';
};

// setCustomOrDefaultTheme :: Object -> Object
var setCustomOrDefaultTheme = function(theme) {
  switch (true) {
    case theme &&
      theme.breakpoints &&
      isObject(theme.breakpoints) &&
      Object.keys(theme.breakpoints).length > 0:
      return theme;
    default:
      theme.breakpoints = DEFAULT_BREAKS_MAP;
      return theme;
  }
};

// toEm :: String -> String
var toEm = function(inPx) {
  return parseFloat(inPx) / 16 + 'em';
};

// makeErrorMessage :: (String, Object) -> String
var makeErrorMessage = function(breakName, breaks) {
  return (
    "'" +
    breakName +
    "' is invalid breakpoint name. Use '" +
    Object.keys(breaks).join(', ') +
    "'."
  );
};

// getNextBreakpointName :: String -> Object -> String | Void
var getNextBreakpointName = function(breakName) {
  return function(breaks) {
    var breakNames = Object.keys(breaks);
    var penultimateBreakName = breakNames[breakNames.length - 2];
    var currentPosition = breakNames.indexOf(breakName);
    var isInvalidBreakName = currentPosition === -1;
    var isLastBreakName =
      currentPosition > -1 && currentPosition >= breakNames.length - 1;

    switch (true) {
      case isInvalidBreakName:
        invariant(!isInvalidBreakName, makeErrorMessage(breakName, breaks));
        break;
      case isLastBreakName:
        invariant(
          !isLastBreakName,

          "Don't use '" +
            breakName +
            "' because it doesn't have a maximum width. Use '" +
            penultimateBreakName +
            "'. See https://github.com/mg901/styled-breakpoints/issues/4 ."
        );
        break;
      default:
        return breakNames[currentPosition + 1];
    }
  };
};

// Maximum breakpoint width. Null for the largest (last) breakpoint.
// The maximum value is calculated as the minimum of the next one less 0.02px
// to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
// See https://bugs.webkit.org/show_bug.cgi?id=178261

// getNextBreakpointValue :: (String, Object) -> String | Void
var getNextBreakpointValue = function(breakName, breaks) {
  invariant(
    breaks[breakName],
    "'" +
      breakName +
      "' is invalid breakpoint name. Use '" +
      Object.keys(breaks)
        .slice(0, -1)
        .join(', ') +
      "'."
  );
  var getNextProp = getNextBreakpointName(breakName);

  return parseFloat(breaks[getNextProp(breaks)]) - 0.02 + 'px';
};

// getBreakpointValue :: (String, Object) -> String | Void
var getBreakpointValue = function(breakName, breaks) {
  invariant(breaks[breakName], makeErrorMessage(breakName, breaks));

  return breaks[breakName];
};

// calcMinWidth :: (String, Object) -> String
var calcMinWidth = function(breakName, theme) {
  var breakpoints = setCustomOrDefaultTheme(theme).breakpoints;

  return toEm(getBreakpointValue(breakName, breakpoints));
};

// calcMaxWidth :: (String, Object) -> String
var calcMaxWidth = function(breakName, theme) {
  var breakpoints = setCustomOrDefaultTheme(theme).breakpoints;

  return toEm(getNextBreakpointValue(breakName, breakpoints));
};

// up :: (String, ?String) -> Object -> String
var up = function(breakName, orientation) {
  return function(props) {
    return withOrientationOrNot(
      withMinMedia(calcMinWidth(breakName, props.theme)),
      orientation
    );
  };
};

// down :: (String, ?String) -> Object -> String
var down = function(breakName, orientation) {
  return function(props) {
    return withOrientationOrNot(
      withMaxMedia(calcMaxWidth(breakName, props.theme)),
      orientation
    );
  };
};

// between :: (String, String, ?String) -> Object -> String
var between = function(minBreak, maxBreak, orientation) {
  return function(props) {
    return withOrientationOrNot(
      withMinAndMaxMedia(
        calcMinWidth(minBreak, props.theme),
        calcMaxWidth(maxBreak, props.theme)
      ),
      orientation
    );
  };
};

// only :: (String, ?String) -> Object -> String
var only = function(breakName, orientation) {
  return function(props) {
    return withOrientationOrNot(
      withMinAndMaxMedia(
        calcMinWidth(breakName, props.theme),
        calcMaxWidth(breakName, props.theme)
      ),
      orientation
    );
  };
};

module.exports = {
  DEFAULT_BREAKS_MAP,
  invariant,
  withOrientationOrNot,
  withMinMedia,
  withMaxMedia,
  withMinAndMaxMedia,
  calcMinWidth,
  calcMaxWidth,
  getBreakpointValue,
  getNextBreakpointValue,
  getNextBreakpointName,
  makeErrorMessage,
  toEm,
  setCustomOrDefaultTheme,
  isObject,
  up,
  down,
  between,
  only,
};
