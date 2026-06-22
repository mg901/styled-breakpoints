import { formatLines, formatValue, INDENT } from '../formatters.js';

const formatEntries = (key, val) => `${INDENT}${INDENT}${key}: "${val}"`;

const PX_INTEGER_REGEX = /^(0|[1-9]\d*)px$/;

const expectedValues = `"0px", "576px", "768px" etc.`;

const validators = [
  {
    expected: 'All breakpoint values must be strings',
    collect: (entries) =>
      entries
        .filter(([, val]) => typeof val !== 'string')
        .map(([key, val]) => formatEntries(key, formatValue(val))),
  },
  {
    expected: 'All values must be non-negative integers with a "px" suffix',
    collect: (entries) =>
      entries
        .filter(([, val]) => !PX_INTEGER_REGEX.test(val.trim()))
        .map(([key, val]) => formatEntries(key, val)),
  },
  {
    expected: '"0px" (initial breakpoint)',
    collect: (entries) => {
      if (entries.some(([, val]) => val === '0px')) return [];

      return entries.map(([key, val]) => formatEntries(key, val));
    },
  },
];

export const withValidation = (factory) => (breakpoints) => {
  const entries = Object.entries(null);

  for (const validator of validators) {
    const invalid = validator.collect(entries);

    if (invalid.length) {
      throw new Error(
        `Received:\n${invalid.join('\n')}${formatLines(
          `Expected:`,
          `${INDENT}${validator.expected}\n`,
          `Example:`,
          `${INDENT}${expectedValues}`
        )}\n`
      );
    }
  }

  return factory(breakpoints);
};
