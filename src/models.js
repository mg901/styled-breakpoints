// @flow strict

export type Breakpoints = { [name: string]: string };

export type ThemeWithBreaks = {
  breakpoints: Breakpoints,
};

export type CustomTheme = {
  breakpoints?: Breakpoints,
};

export type BpProps = {
  theme: CustomTheme,
};
