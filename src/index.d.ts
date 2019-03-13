type Breakpoints = { [key: string]: string };

type ThemeWithBreaks = {
  breakpoints: Breakpoints;
};

type CustomTheme = {
  ERROR_PREFIX_FOR_STYLED_BREAKPOINTS?: string;
  breakpoints?: Breakpoints;
};

export declare type BpProps = {
  theme: CustomTheme;
};

export declare type Up = (breakName: string) => (props: BpProps) => string;

export declare type Down = (breakName: string) => (props: BpProps) => string;

export declare type Between = (
  minBreak: string,
  maxBreak: string,
) => (props: BpProps) => string;

export declare type Only = (breakName: string) => (props: BpProps) => string;
