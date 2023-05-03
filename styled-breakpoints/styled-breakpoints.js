const { get, createInvariantWithPrefix, memoize } = require('../library');
const { createBreakpoints } = require('../breakpoints');

const defaultOptions = {
  errorPrefix: '[styled-breakpoints]: ',
  pathToMediaQueries: 'styled-breakpoints.breakpoints',
  defaultBreakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
};

exports.createStyledBreakpoints = (options = defaultOptions) => {
  const invariant = createInvariantWithPrefix(options.errorPrefix);

  const getMediaQueriesFromTheme = ({ theme = {} }) => {
    const memoizedGet = memoize(get);

    const memoizedMediaQueries = memoizedGet(
      theme,
      options.pathToMediaQueries,
      options.defaultBreakpoints
    );

    return memoizedMediaQueries;
  };

  const withBreakpoints = (fn) => (props) => {
    const mediaQueriesFromTheme = getMediaQueriesFromTheme(props);
    const createMemoizedBreakpoints = memoize(createBreakpoints);

    const breakpoints = createMemoizedBreakpoints({
      breakpoints: mediaQueriesFromTheme,
      errorPrefix: options.errorPrefix,
    });

    return fn(breakpoints);
  };

  const checkIsValidOrientation = (x) => {
    const validOrientations = x === 'portrait' || x === 'landscape';

    invariant(
      validOrientations,
      `\`${x}\` is invalid orientation. Use \`landscape\` or \`portrait\`.`
    );
  };

  const withOrientation = (mediaQuery, orientation) => {
    checkIsValidOrientation(orientation);

    return `${mediaQuery} and (orientation: ${orientation})`;
  };

  const withOrientationOrNot = memoize((orientation, result) =>
    orientation ? withOrientation(result, orientation) : result
  );

  const withMinAndMaxMedia = ({ min, max }) =>
    `@media (min-width: ${min}) and (max-width: ${max})`;

  return {
    up: (name, orientation) =>
      withBreakpoints(({ up }) =>
        withOrientationOrNot(orientation, `@media (min-width: ${up(name)})`)
      ),
    down: (name, orientation) =>
      withBreakpoints(({ down }) =>
        withOrientationOrNot(orientation, `@media (max-width: ${down(name)})`)
      ),

    between: (min, max, orientation) =>
      withBreakpoints(({ between }) =>
        withOrientationOrNot(orientation, withMinAndMaxMedia(between(min, max)))
      ),

    only: (name, orientation) =>
      withBreakpoints(({ only }) =>
        withOrientationOrNot(orientation, withMinAndMaxMedia(only(name)))
      ),
  };
};

exports.createTheme = (breakpoints) => ({
  'styled-breakpoints': {
    breakpoints,
  },
});
