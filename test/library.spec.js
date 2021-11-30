const {
  PROPS_WITH_CUSTOM_THEME,
  PROPS_WITH_EMPTY_THEME,
  BREAKPOINTS,
} = require('./mocks');

const {
  get,
  withMinAndMaxMedia,
  makeErrorMessage,
} = require('../core/library');

describe('get', () => {
  it('return value stored at the specified path', () => {
    expect(get(PROPS_WITH_CUSTOM_THEME, 'theme.breakpoints')).toEqual({
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    });
  });

  it('if there is nothing on the specified path, it defaults', () => {
    expect(get(PROPS_WITH_EMPTY_THEME, 'theme.breakpoints', 1)).toEqual(1);
  });
});

describe('withMinAndMaxMedia', () => {
  it('return media query with the passes value', () => {
    expect(withMinAndMaxMedia('20em', '40em')).toEqual(
      '@media (min-width: 20em) and (max-width: 40em)'
    );
  });
});

describe('makeErrorMessage', () => {
  it('build error message', () => {
    expect(makeErrorMessage('blabla', BREAKPOINTS)).toEqual(
      "'blabla' is invalid breakpoint name. Use 'xs, sm, md, lg, xl'."
    );
  });
});
