export interface IProps {
  theme: object;
}

export type Orientation = 'portrait' | 'landscape';

export interface IMediaQueries {
  [key: string]: string;
}

export interface IOptions {
  _browserContext?: number;
  pathToMediaQueries?: string[];
  errorPrefix?: string;
  defaultMediaQueries?: IMediaQueries;
}

export interface IState {
  _browserContext: number;
  pathToMediaQueries: string[];
  errorPrefix: string;
  defaultMediaQueries: IMediaQueries;
}

interface IPrivateMethods {
  _invariant: (x: unknown, y: string) => void;
  _throwIsInvalidBreakName: (x: string, y: IMediaQueries) => void;
  _throwIsLastBreak: (x: string, y: IMediaQueries) => void;
  _throwIsInvalidNextBreakValue: (x: string, y: IMediaQueries) => void;
  _throwIsInvalidOrientation: (x: string) => void;
  _withOrientationOrNot: (x: string, y?: string) => string;
  _toEm: (x: string) => string;
  _getBreakpointsFromTheme: (x: object) => IMediaQueries;
  _getNextBreakpointName: (x: string) => (y: IMediaQueries) => string;
  _getNextBreakpointValue: (x: string, y: IMediaQueries) => string;
  _getBreakpointValue: (x: string, y: IMediaQueries) => string;
  _calcMinWidth: (x: string, y: object) => string;
  _calcMaxWidth: (x: string, y: object) => string;
}

interface IPublicMethods {
  up: (x: string, y?: 'portrait' | 'landscape') => (z: IProps) => string;
  down: (x: string, y?: 'portrait' | 'landscape') => (z: IProps) => string;
  between: (
    a: string,
    b: string,
    c?: 'portrait' | 'landscape'
  ) => (d: IProps) => string;
  only: (x: string, y?: 'portrait' | 'landscape') => (z: IProps) => string;
}

export type StyledBreakpoints = IState & IPrivateMethods & IPublicMethods;
export type MakeStyledBreakpoints = (x?: IOptions) => StyledBreakpoints;

export const _type = function(x: unknown): string {
  return {}.toString.call(x).slice(8, -1);
};

type GetFn = <T>(x: string[], y: any, z?: T) => unknown | T;
export const _get: GetFn = function(path, obj, defaultValue) {
  const head = path[0];
  const tail = path.slice(1);

  if (!tail.length) {
    const res = obj[head];
    const isEmpty =
      (_type(res) === 'Object' && Object.keys(res).length === 0) ||
      _type(res) === 'Null' ||
      _type(res) === 'Undefined';

    return isEmpty ? defaultValue : obj[head];
  }

  return _get(tail, obj[head], defaultValue);
};

export const _withMinMedia = function(x: string): string {
  return '@media (min-width: ' + x + ')';
};

export const _withMaxMedia = function(x: string): string {
  return '@media (max-width: ' + x + ')';
};

export const _withMinAndMaxMedia = function(x: string, y: string): string {
  return '@media (min-width: ' + x + ') and (max-width: ' + y + ')';
};

type MakeErrorMessage = (x: string, y: IMediaQueries) => string;
export const _makeErrorMessage: MakeErrorMessage = function(breakName, breaks) {
  return (
    "'" +
    breakName +
    "' is invalid breakpoint name. Use '" +
    Object.keys(breaks).join(', ') +
    "'."
  );
};

export const _makeStyledBreakpoints = function(
  options?: IOptions
): StyledBreakpoints {
  const _options: IOptions = options || {};
  const state = {
    pathToMediaQueries: _options.pathToMediaQueries || ['breakpoints'],
    errorPrefix: _options.errorPrefix || '[styled-breakpoints]: ',
    defaultMediaQueries: _options.defaultMediaQueries || {
      tablet: '768px',
      desktop: '992px',
      lgDesktop: '1200px',
    },
    _browserContext: 16,

    _invariant(condition: unknown, message: string): void {
      if (!condition) {
        throw new Error(state.errorPrefix + message);
      }
    },
    _throwIsInvalidBreakName(breakName: string, breaks: IMediaQueries): void {
      state._invariant(breaks[breakName], _makeErrorMessage(breakName, breaks));
    },
    _throwIsLastBreak(breakName: string, breaks: IMediaQueries): void {
      const names = Object.keys(breaks);
      const penultimateBreakName = names[names.length - 2];
      const isValid = names.indexOf(breakName) !== names.length - 1;

      state._invariant(
        isValid,
        "Don't use '" +
          breakName +
          "' because it doesn't have a maximum width. Use '" +
          penultimateBreakName +
          "'. See https://github.com/mg901/styled-breakpoints/issues/4 ."
      );
    },
    _throwIsInvalidNextBreakValue(name: string, breaks: IMediaQueries): void {
      state._invariant(
        breaks[name],
        "'" +
          name +
          "' is invalid breakpoint name. Use '" +
          Object.keys(breaks)
            .slice(0, -1)
            .join(', ') +
          "'."
      );
    },
    _throwIsInvalidOrientation(x: string): void {
      state._invariant(
        x === 'portrait' || x === 'landscape',
        "'" + x + "' is invalid orientation. Use 'landscape' or 'portrait'."
      );
    },
    _withOrientationOrNot(x: string, y?: string): string {
      if (y) {
        state._throwIsInvalidOrientation(y);
        return x + ' and (orientation: ' + y + ')';
      }

      return x;
    },
    _toEm(x: string): string {
      return parseFloat(x) / state._browserContext + 'em';
    },
    _getBreakpointsFromTheme(theme: object): IMediaQueries {
      return _get(
        state.pathToMediaQueries,
        theme,
        state.defaultMediaQueries
      ) as IMediaQueries;
    },
    _getNextBreakpointName(name: string) {
      return function(breaks: IMediaQueries): string {
        state._throwIsInvalidBreakName(name, breaks);
        state._throwIsLastBreak(name, breaks);

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

    _getNextBreakpointValue(name: string, breaks: IMediaQueries): string {
      state._throwIsInvalidNextBreakValue(name, breaks);
      const getNextName = state._getNextBreakpointName(name);

      return parseFloat(breaks[getNextName(breaks)]) - 0.02 + 'px';
    },
    _getBreakpointValue(name: string, breaks: IMediaQueries): string {
      state._throwIsInvalidBreakName(name, breaks);

      return breaks[name];
    },
    _calcMinWidth(name: string, theme: object): string {
      return state._toEm(
        state._getBreakpointValue(name, state._getBreakpointsFromTheme(theme))
      );
    },
    _calcMaxWidth(name: string, theme: object): string {
      return state._toEm(
        state._getNextBreakpointValue(
          name,
          state._getBreakpointsFromTheme(theme)
        )
      );
    },
    up(name: string, orientation?: Orientation) {
      return function(props: IProps): string {
        return state._withOrientationOrNot(
          _withMinMedia(state._calcMinWidth(name, props.theme)),
          orientation
        );
      };
    },
    down(name: string, orientation?: Orientation) {
      return function(props: IProps): string {
        return state._withOrientationOrNot(
          _withMaxMedia(state._calcMaxWidth(name, props.theme)),
          orientation
        );
      };
    },
    between(min: string, max: string, orientation?: Orientation) {
      return function(props: IProps): string {
        return state._withOrientationOrNot(
          _withMinAndMaxMedia(
            state._calcMinWidth(min, props.theme),
            state._calcMaxWidth(max, props.theme)
          ),
          orientation
        );
      };
    },
    only(name: string, orientation?: Orientation) {
      return function(props: IProps): string {
        return state._withOrientationOrNot(
          _withMinAndMaxMedia(
            state._calcMinWidth(name, props.theme),
            state._calcMaxWidth(name, props.theme)
          ),
          orientation
        );
      };
    },
  };

  return state;
};

const bp = _makeStyledBreakpoints();

export const up = bp.up;
export const down = bp.down;
export const between = bp.between;
export const only = bp.only;
