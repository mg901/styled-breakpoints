import type {
  StyledBreakpointsTheme,
  Values,
  ThemeBreakpoints,
} from '../create-theme/types';
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

type BreakpointValidators = {
  up: (...args: any[]) => ValidationResult[];
  down: (...args: any[]) => ValidationResult[];
  between: (...args: any[]) => ValidationResult[];
  only: (...args: any[]) => ValidationResult[];
};

export const buildBreakpointValidators = <T extends Values>(
  theme: StyledBreakpointsTheme<T>
): BreakpointValidators => {
  const ctx = buildContext(theme);
  const validateBreakpointExist = createExistenceValidator(ctx);
  const validateZeroUpperBound = createZeroBoundValidator(ctx);
  const validateRangeOrder = createRangeOrderValidator(ctx);

  return {
    up: (min: string, orientation?: string) => [
      validateBreakpointExist(min),
      validateOrientation(orientation),
    ],
    down: (max: string, orientation?: string) => [
      validateBreakpointExist(max),
      validateZeroUpperBound(max),
      validateOrientation(orientation),
    ],
    between: (min: string, max: string, orientation?: string) => [
      validateRangeArity(min, max),
      validateBreakpointExist(min, 'First breakpoint'),
      validateBreakpointExist(max, 'Second breakpoint'),
      validateRangeOrder(min, max),
      validateOrientation(orientation),
    ],
    only: (key: string, orientation?: string) => [
      validateBreakpointExist(key),
      validateOrientation(orientation),
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

  type ValidatorEntries = {
    [K in MethodName]: [K, (typeof validators)[K]];
  }[MethodName];

  const entries = Object.entries(validators) as ValidatorEntries[];

  return {
    ...theme,
    breakpoints: Object.fromEntries(
      entries.map(([name, validator]) => [
        name,
        memoize((...args) => {
          const issue = validator(...args).find(Boolean);

          if (issue) {
            const details = buildErrorDetails(issue, name, args);

            throw new Error(
              `${errorPrefix}breakpoints.${name}() failed:\n\n${details}\n`
            );
          }

          const method = theme.breakpoints[name] as (...args: any[]) => string;

          return method(...args);
        }),
      ])
    ) as unknown as ThemeBreakpoints<T>,
  };
};
