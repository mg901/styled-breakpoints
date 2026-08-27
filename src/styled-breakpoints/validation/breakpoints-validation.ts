import type { StyledBreakpointsTheme, Values } from '../create-theme/types';
import { INDENT, toQuotedList } from './formatters';

type Args = readonly (string | undefined)[];

type MethodName = 'up' | 'down' | 'between' | 'only';

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
  (key: string | undefined, prefix = 'Breakpoint'): ValidationResult =>
    key !== undefined && ctx.keysSet.has(key)
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
  (key: string | undefined): ValidationResult =>
    key !== ctx.firstKey
      ? null
      : {
          reason: MSG_ZERO_UPPER_BOUND,
          expected: toQuotedList(ctx.keysExceptFirst),
        };

const validateRangeArity = (
  min: string | undefined,
  max: string | undefined
): ValidationResult =>
  min !== undefined && max !== undefined
    ? null
    : {
        reason: MSG_INVALID_ARITY,
        expected: '2 arguments (min, max)',
      };

const createRangeOrderValidator = (ctx: Ctx) => {
  // Widened so a missing argument reads as -1 instead of needing a cast.
  const keys: Args = ctx.keys;

  return (
    min: string | undefined,
    max: string | undefined
  ): ValidationResult =>
    keys.indexOf(min) < keys.indexOf(max)
      ? null
      : {
          reason: MSG_MIN_GREATER_THAN_MAX,
        };
};

const NULL_BYTE = '\x00';

const memoize = <A extends Args, R>(fn: (...args: A) => R) => {
  const cache = new Map<string, R>();

  return (...args: A): R => {
    const key = args.join(NULL_BYTE);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const value = fn(...args);
    cache.set(key, value);

    return value;
  };
};

const buildErrorDetails = (
  issue: ValidationIssue,
  methodName: MethodName,
  args: Args
) => {
  const lines = [];

  lines.push(`- Reason: ${issue.reason}`);
  if (issue.available) lines.push(`- Available: ${issue.available}`);
  if (issue.expected) lines.push(`- Expected: ${issue.expected}`);
  lines.push(`- Received: ${methodName}(${toQuotedList(args.map(String))})`);

  return lines.map((line) => `${INDENT}${line}`).join('\n\n');
};

export const withBreakpointValidation = <T extends Values>(
  errorPrefix: string,
  theme: StyledBreakpointsTheme<T>
): StyledBreakpointsTheme<T> => {
  const ctx = buildContext(theme);
  const validateBreakpointExist = createExistenceValidator(ctx);
  const validateZeroUpperBound = createZeroBoundValidator(ctx);
  const validateRangeOrder = createRangeOrderValidator(ctx);
  const { up, down, between, only } = theme.breakpoints;

  const guard = <A extends Args>(
    name: MethodName,
    method: (...args: A) => string,
    validate: (args: A) => readonly ValidationResult[]
  ) =>
    memoize((...args: A): string => {
      const issue = validate(args).find(Boolean);

      if (issue) {
        const details = buildErrorDetails(issue, name, args);

        throw new Error(
          `${errorPrefix}breakpoints.${name}() failed:\n\n${details}\n`
        );
      }

      return method(...args);
    });

  return {
    ...theme,
    breakpoints: {
      ...theme.breakpoints,
      up: guard('up', up, ([min, orientation]) => [
        validateBreakpointExist(min),
        validateOrientation(orientation),
      ]),
      down: guard('down', down, ([max, orientation]) => [
        validateBreakpointExist(max),
        validateZeroUpperBound(max),
        validateOrientation(orientation),
      ]),
      between: guard('between', between, ([min, max, orientation]) => [
        validateRangeArity(min, max),
        validateBreakpointExist(min, 'First breakpoint'),
        validateBreakpointExist(max, 'Second breakpoint'),
        validateRangeOrder(min, max),
        validateOrientation(orientation),
      ]),
      only: guard('only', only, ([key, orientation]) => [
        validateBreakpointExist(key),
        validateOrientation(orientation),
      ]),
    },
  };
};
