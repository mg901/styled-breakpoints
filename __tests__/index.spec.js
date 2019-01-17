import { up, down, between, only } from '../src';
import { THEME_WITH_DEFAULT_BREAKS } from '../src/constants';

describe('up', () => {
  it('should return string with min breakpoint value and media query', () => {
    expect(up('tablet')(THEME_WITH_DEFAULT_BREAKS)).toEqual(
      '@media (min-width: 48em)',
    );
  });
});

describe('down', () => {
  it('should return string with max breakpoint value and media query', () => {
    expect(down('tablet')(THEME_WITH_DEFAULT_BREAKS)).toEqual(
      '@media (max-width: 61.99875em)',
    );
  });
});

describe('between', () => {
  it('should returns a string containing the value of the minimum and maximum breakpoints and media query', () => {
    expect(between('tablet', 'desktop')(THEME_WITH_DEFAULT_BREAKS)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em)',
    );
  });
});

describe('only', () => {
  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query', () => {
    expect(only('tablet')(THEME_WITH_DEFAULT_BREAKS)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em)',
    );
  });
});
