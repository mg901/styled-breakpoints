interface IBreakpoints {
  [key: string]: string;
}

interface IThemeWithBreaks {
  breakpoints: IBreakpoints;
}

interface ICustomTheme {
  breakpoints?: IBreakpoints;
}

export interface IBpProps {
  theme: ICustomTheme;
}

type RuleFnType = (props: IBpProps) => string;

export function up(
  breakName: keyof IBreakpoints,
  orientation?: string,
): RuleFnType;

export function down(
  breakName: keyof IBreakpoints,
  orientation?: string,
): RuleFnType;

export function between(
  minBreak: keyof IBreakpoints,
  maxBreak: keyof IBreakpoints,
  orientation?: string,
): RuleFnType;

export function only(
  breakName: keyof IBreakpoints,
  orientation?: string,
): RuleFnType;
