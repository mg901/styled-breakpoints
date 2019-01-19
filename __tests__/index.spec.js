import { up, down, between, only } from '../es/styled-breakpoints.es.js';

const CUSTOM_THEME = {
  theme: {
    breakpoints: {
      tablet: '768px',
      desktop: '992px',
      lgDesktop: '1200px',
    },
  },
};

const CUSTOM_THEME_IS_EMPTY = {
  theme: {},
};

describe('up', () => {
  it('should return string with min breakpoint value and media query', () => {
    expect(up('tablet')(CUSTOM_THEME)).toEqual('@media (min-width: 48em)');
  });

  it('should return string with min breakpoint value and media query (from default theme)', () => {
    expect(up('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em)',
    );
  });
});

describe('down', () => {
  it('should return string with max breakpoint value and media query', () => {
    expect(down('tablet')(CUSTOM_THEME)).toEqual(
      '@media (max-width: 61.99875em)',
    );
  });

  it('should return string with max breakpoint value and media query (from default theme)', () => {
    expect(down('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (max-width: 61.99875em)',
    );
  });
});

describe('between', () => {
  it('should returns a string containing the value of the minimum and maximum breakpoints and media query', () => {
    expect(between('tablet', 'desktop')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em)',
    );
  });

  it('should returns a string containing the value of the minimum and maximum breakpoints and media query (from default theme)', () => {
    expect(between('tablet', 'desktop')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em)',
    );
  });
});

describe('only', () => {
  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query', () => {
    expect(only('tablet')(CUSTOM_THEME)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em)',
    );
  });

  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query (from default theme)', () => {
    expect(only('tablet')(CUSTOM_THEME_IS_EMPTY)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em)',
    );
  });
});
