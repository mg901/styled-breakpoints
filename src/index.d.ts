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

export function up(breakName: string, orientation?: string): RuleFnType;

export function down(breakName: string, orientation?: string): RuleFnType;

export function between(
  minBreak: string,
  maxBreak: string,
  orientation?: string,
): RuleFnType;

export function only(breakName: string, orientation?: string): RuleFnType;
