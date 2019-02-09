// @flow

export type Breakpoints = { [name: string]: string };

export type ThemeWithBreaks = {
  breakpoints: Breakpoints,
};

export type CustomTheme = {
  ERROR_PREFIX_FOR_STYLED_BREAKPOINTS?: string,
  breakpoints?: Breakpoints,
};

export type BpProps = {
  theme: CustomTheme,
};
