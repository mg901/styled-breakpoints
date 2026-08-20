import type { StyledBreakpointsTheme, Values } from '../create-theme/types';
import { INDENT, toQuotedList } from './formatters';

const buildContext = <T extends Values>({
  breakpoints: { keys },
}: StyledBreakpointsTheme<T>) => ({
  keys,
  keysSet: new Set(keys),
  firstKey: keys[0],
  keysExceptFirst: keys.slice(1),
});

type Ctx = ReturnType<typeof buildContext>;

type ValidationIssue = {
  reason: string;
  available?: string;
  expected?: string;
};

type ValidationResult = ValidationIssue | null;

const MSG_NOT_EXIST = 'does not exist.';
const MSG_INVALID_ORIENTATION = 'Invalid orientation.';
const MSG_ZERO_UPPER_BOUND = '"0px" cannot be used as an upper bound.';
const MSG_INVALID_ARITY = 'Invalid number of arguments.';

const MSG_MIN_GREATER_THAN_MAX =
  'Min breakpoint must be less than max breakpoint.';

const createExistenceValidator =
  (ctx: Ctx) =>
  (key: string, prefix = 'Breakpoint'): ValidationResult =>
    ctx.keysSet.has(key)
      ? null
      : {
          reason: `${prefix} ${MSG_NOT_EXIST}`,
          available: toQuotedList(ctx.keys),
        };

const orientations = ['landscape', 'portrait'];
const expected = toQuotedList(orientations);

const validateOrientation = (value?: string): ValidationResult =>
  value === undefined || orientations.includes(value)
    ? null
    : {
        reason: MSG_INVALID_ORIENTATION,
        expected,
      };

const createZeroBoundValidator =
  (ctx: Ctx) =>
  (key: string): ValidationResult =>
    key !== ctx.firstKey
      ? null
      : {
          reason: MSG_ZERO_UPPER_BOUND,
          expected: toQuotedList(ctx.keysExceptFirst),
        };

const validateRangeArity = (min: string, max: string): ValidationResult =>
  min !== undefined && max !== undefined
    ? null
    : {
        reason: MSG_INVALID_ARITY,
        expected: '2 arguments (min, max)',
      };

const createRangeOrderValidator =
  (ctx: Ctx) =>
  (min: string, max: string): ValidationResult =>
    ctx.keys.indexOf(min) < ctx.keys.indexOf(max)
      ? null
      : {
          reason: MSG_MIN_GREATER_THAN_MAX,
        };

export const buildBreakpointValidators = <T extends Values>(
  theme: StyledBreakpointsTheme<T>
) => {
  const ctx = buildContext(theme);
  const validateBreakpointExist = createExistenceValidator(ctx);
  const validateZeroUpperBound = createZeroBoundValidator(ctx);
  const validateRangeOrder = createRangeOrderValidator(ctx);

  return {
    up: (...args: any[]) => [
      validateBreakpointExist(args[0]),
      validateOrientation(args[1]),
    ],
    down: (...args: any[]) => [
      validateBreakpointExist(args[0]),
      validateZeroUpperBound(args[0]),
      validateOrientation(args[1]),
    ],
    between: (...args: any[]) => {
      const min = args[0];
      const max = args[1];

      return [
        validateRangeArity(min, max),
        validateBreakpointExist(min, 'First breakpoint'),
        validateBreakpointExist(max, 'Second breakpoint'),
        validateRangeOrder(min, max),
        validateOrientation(args[2]),
      ];
    },
    only: (...args: any[]) => [
      validateBreakpointExist(args[0]),
      validateOrientation(args[1]),
    ],
  };
};

const NULL_BYTE = '\x00';

const memoize = <T extends (...args: any[]) => unknown>(fn: T) => {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = args.join(NULL_BYTE);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const value = fn(...args) as ReturnType<T>;
    cache.set(key, value);

    return value;
  };
};

const buildErrorDetails = (
  issue: ValidationIssue,
  methodName: string,
  args: string[]
) => {
  const lines = [];

  lines.push(`- Reason: ${issue.reason}`);
  if (issue.available) lines.push(`- Available: ${issue.available}`);
  if (issue.expected) lines.push(`- Expected: ${issue.expected}`);
  lines.push(`- Received: ${methodName}(${toQuotedList(args)})`);

  return lines.map((line) => `${INDENT}${line}`).join('\n\n');
};

export const withBreakpointValidation = <T extends Values>(
  errorPrefix: string,
  theme: StyledBreakpointsTheme<T>
): StyledBreakpointsTheme<T> => {
  const validators = buildBreakpointValidators<T>(theme);
  type MethodName = keyof typeof validators;

  const entries = (Object.keys(validators) as MethodName[]).map((name) => [
    name,
    memoize((...args) => {
      const issue = validators[name](...args).find(Boolean);

      if (issue) {
        const details = buildErrorDetails(issue, name, args);

        throw new Error(
          `${errorPrefix}breakpoints.${name}() failed:\n\n${details}\n`
        );
      }

      const method = theme.breakpoints[name] as (...args: any[]) => string;

      return method(...args);
    }),
  ]);

  return {
    ...theme,
    breakpoints: {
      ...theme.breakpoints,
      ...Object.fromEntries(entries),
    },
  };
};
