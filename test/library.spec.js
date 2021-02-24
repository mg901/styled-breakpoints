const {
  PROPS_WITH_CUSTOM_THEME,
  PROPS_WITH_EMPTY_THEME,
  BREAKPOINTS,
} = require('./mocks');

const {
  type,
  get,
  withMinAndMaxMedia,
  makeErrorMessage,
  isEmpty,
} = require('../core/library');

describe('type', () => {
  it("it return 'true' if is an object", () => {
    expect(type({})).toEqual('Object');
  });

  it("it return 'true' if isn't an object", () => {
    expect(type(undefined)).toEqual('Undefined');
  });
});

describe('get', () => {
  it('return value stored at the specified path', () => {
    expect(get(['theme', 'breakpoints'], PROPS_WITH_CUSTOM_THEME)).toEqual({
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    });
  });

  it('if there is nothing on the specified path, it defaults', () => {
    expect(get(['theme', 'breakpoints'], PROPS_WITH_EMPTY_THEME, 1)).toEqual(1);
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

describe('isEmpty', () => {
  it('empty object', () => {
    expect(isEmpty({})).toBeTruthy();
  });

  it('empty object', () => {
    expect(isEmpty({ a: 1 })).toBeFalsy();
  });

  it('undefined', () => {
    expect(isEmpty(undefined)).toBeTruthy();
  });
});
