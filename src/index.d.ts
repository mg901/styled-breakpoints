interface IBreakpoints {
  [key: string]: string;
}

interface IThemeWithBreaks {
  breakpoints: IBreakpoints;
}

interface ICustomTheme {
  ERROR_PREFIX_FOR_STYLED_BREAKPOINTS?: string;
  breakpoints?: IBreakpoints;
}

export interface IBpProps {
  theme: ICustomTheme;
}

type RuleFnType = (props: IBpProps) => string;

export function up(breakName: string): RuleFnType;

export function down(breakName: string): RuleFnType;

export function between(minBreak: string, maxBreak: string): RuleFnType;

export function only(breakName: string): RuleFnType;
