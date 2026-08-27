import type { Config, Values } from '../create-theme/types';
import { formatValue, INDENT } from './formatters';

const PX_INTEGER_REGEX = /^(0|[1-9]\d*)px$/;

const validators = [
  {
    reason: 'All breakpoint values must be strings',
    collect: (entries: [string, string][]) =>
      entries.filter(([, val]) => typeof val !== 'string'),
  },
  {
    reason: 'All values must be non-negative integers with a "px" suffix',
    collect: (entries: [string, string][]) =>
      entries.filter(([, val]) => !PX_INTEGER_REGEX.test(val.trim())),
  },
  {
    reason: 'Missing initial breakpoint "0px"',
    collect: (entries: [string, string][]) => {
      if (entries.some(([, val]) => val === '0px')) return [];

      return entries;
    },
  },
];

const EXAMPLE_BREAKPOINTS = `"0px", "576px", "768px" etc.`;

const formatEntries = ([key, val]: [string, string]) =>
  `${INDENT}${INDENT}- ${key}: "${formatValue(val)}"`;

const buildErrorDetails = (reason: string, received: [string, string][]) =>
  `Reason: ${reason}\n\n` +
  `${INDENT}Example: ${EXAMPLE_BREAKPOINTS}\n\n` +
  `${INDENT}Received:\n${received.map(formatEntries).join('\n')}\n`;

const findConfigIssue = <T extends Values>({
  breakpoints,
}: Config<T>): string | null => {
  if (!breakpoints || Object.keys(breakpoints).length === 0) {
    return 'Reason: "breakpoints" must be defined.';
  }

  const { values } = breakpoints;

  if (!values || Object.keys(values).length === 0) {
    return 'Reason: "breakpoints.values" must be defined.';
  }

  const entries = Object.entries(values);

  for (const { reason, collect } of validators) {
    const invalid = collect(entries);

    if (invalid.length) {
      return buildErrorDetails(reason, invalid);
    }
  }

  return null;
};

export const validateConfig = <T extends Values>(
  errorPrefix: string,
  config: Config<T>
) => {
  const issue = findConfigIssue(config);

  if (issue) {
    throw new Error(
      `${errorPrefix}Theme configuration failed:\n\n  ${issue}\n`
    );
  }
};
