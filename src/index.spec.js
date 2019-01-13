import { createAbove, createBelow, createBetween, createOnly } from '.';
import { themeWithDefaultBreaks } from './constants';

describe('createAbove', () => {
  it('should return string with min breakpoint value and media query', () => {
    expect(createAbove('tablet')(themeWithDefaultBreaks)).toEqual(
      '@media (min-width: 48em)',
    );
  });
});

describe('createBelow', () => {
  it('should return string with max breakpoint value and media query', () => {
    expect(createBelow('tablet')(themeWithDefaultBreaks)).toEqual(
      '@media (max-width: 61.99875em)',
    );
  });
});

describe('createBetween', () => {
  it('should returns a string containing the value of the minimum and maximum breakpoints and media query', () => {
    expect(createBetween('tablet', 'desktop')(themeWithDefaultBreaks)).toEqual(
      '@media (min-width: 48em) and (max-width: 74.99875em)',
    );
  });
});

describe('createOnly', () => {
  it('should returns a string containing the minimum and maximum values of the current breakpoint and media query', () => {
    expect(createOnly('tablet')(themeWithDefaultBreaks)).toEqual(
      '@media (min-width: 48em) and (max-width: 61.99875em)',
    );
  });
});
