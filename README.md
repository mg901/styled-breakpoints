<div align="center">
<h1>

<br>
styled-breakpoints <br>

<a href="https://github.com/mg901/styled-breakpoints/actions?query=workflow%3Arelease">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/mg901/styled-breakpoints/ci-release.yml?branch=master&style=flat-square">
</a>

<a href="https://coveralls.io/github/mg901/styled-breakpoints?branch=master">
<img alt="coverage status" src="https://img.shields.io/coverallsCoverage/github/mg901/styled-breakpoints?style=flat-square">
</a>

<a href="https://bundlephobia.com/package/styled-breakpoints">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/styled-breakpoints?style=flat-square">
</a>
<a href="https://img.shields.io/npm/dm/styled-breakpoints?style=flat-square">
<img alt="npm downloads" src="https://img.shields.io/npm/dm/styled-breakpoints?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/styled-breakpoints">
<img alt="npm version" src="https://img.shields.io/npm/v/styled-breakpoints.svg?style=flat-square">
</a>

</h1>

<p>Simple and powerful tool for creating media queries with SSR support.</p>

<p>
<a href="https://www.styled-components.com" rel="nofollow">
    <img src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" alt="Styled Components Logo" width="80">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;<strong>OR</strong>&nbsp;&nbsp;&nbsp;
<a href="https://emotion.sh/docs/introduction" rel="nofollow"><img src="https://raw.githubusercontent.com/emotion-js/emotion/main/emotion.png" alt="Emotion logo" width="80"></a>

<p>

</div>
<br >
<br >

## 🌼 Preview

**Inside** components.

```tsx
const Box = styled.div`
  background-color: pink;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    background-color: hotpink;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    background-color: red;
  }
`;
```

<br>

**Outside** components.

```tsx
import { useTheme } from 'styled-components'; // or '@emotion/react'

const Layout = () => {
  const { up } = useTheme().breakpoints;
  const isMd = useMediaQuery(up('md'));

  return <>{isMd && <Box />}</>;
};
```

<br>

## Examples

### 👉🏻 Mobile First

From smallest to largest

<div>
  <a href="https://codesandbox.io/s/rough-wave-u0uuu?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp.tsx&theme=dark">
  <img alt="Edit mobile-first" src="https://codesandbox.io/static/img/play-codesandbox.svg">
  </a>
</div>

<br>

### 👉🏻 Desktop First

From largest to smallest

<div>
  <a href="https://codesandbox.io/s/desktop-first-example-0plsg?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp.tsx&theme=dark">
    <img alt="Edit desktop first example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
  </a>
</div>

<br>

### 👉🏻 Hooks API

<div>
  <a href="https://codesandbox.io/s/styled-components-hooks-api-6q6w8?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp.tsx&theme=dark">
    <img alt="Hooks api (styled-components)" src="https://codesandbox.io/static/img/play-codesandbox.svg">
  </a>
</div>

<br>

<br>

## 📖 Documentation

- [core concepts](#core-concepts)
- 🚩 [getting started](#getting-started)
- [Media Queries API](#media-queries-api)

  - [min-width - up](#min-width---up)
  - [max-width - down](#max-width---down)
  - [single breakpoint - only](#single-breakpoint---only)
  - [breakpoints range - between](#breakpoints-range---between)
  - [customization](#customization)

- [useMediaQuery hook](#usemediaquery-hook)

<br>

## 🧐 Core concepts

- **Breakpoints act as the fundamental elements of responsive design**. They enable you to control when your layout can adapt to a specific viewport or device size.

- **Utilize media queries to structure your CSS based on breakpoints**. Media queries are CSS features that allow you to selectively apply styles depending on a defined set of browser and operating system parameters. The most commonly used media query property is <code>min-width</code>.

- **The objective is mobile-first, responsive design**. Styled Breakpoints aims to apply the essential styles required for a layout to function at the smallest breakpoint. Additional styles are then added to adjust the design for larger devices. This approach optimizes your CSS, enhances rendering speed, and delivers an excellent user experience.

<br>

## Getting Started

### 🚩 Installation

```sh
npm install styled-breakpoints@latest

# or

yarn add styled-breakpoints@latest
```

<br >

### Configuration

#### 🚩 File Structure

```js
 theme/
 ├── index.ts
 └── styled.d.ts // or emotion.d.ts
 app.tsx
```

<br>

#### 🚩 Available breakpoints

Styled Breakpoints includes six default breakpoints, often referred to as grid tiers, for building responsive designs. These breakpoints can be [customized](#customization).

```tsx
const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};
```

Each breakpoint has been carefully selected to accommodate containers with widths that are multiples of 12. The breakpoints also represent a subset of common device sizes and viewport dimensions, although they do not specifically target every use case or device. Instead, they provide a robust and consistent foundation for building designs that cater to nearly any device.

<br>

#### 🚩 Default Configuration

`theme/index.ts`

```tsx
import { createStyledBreakpointsTheme } from 'styled-breakpoints';

export const theme = createStyledBreakpointsTheme();
```

<hr/>
<br>

#### Customization

##### 🚩 Breakpoints

`theme/index.ts`

```tsx
import { createStyledBreakpointsTheme } from 'styled-breakpoints';

export const theme = createStyledBreakpointsTheme({
  breakpoints: {
    small: '100px',
    medium: '200px',
    large: '300px',
    xLarge: '400px',
    xxLarge: '500px',
  },
});
```

<br>

##### 🎨 Merge with Another Theme

`theme/index.ts`

```tsx
import { createStyledBreakpointsTheme } from 'styled-breakpoints';

export const primaryTheme = {
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
} as const;

export const theme = {
  ...primaryTheme,
  ...createStyledBreakpointsTheme(),
};
```

<hr>
<br>

<h4>💅 Using with Styled Components</h4>

##### 🚩 Installation

```sh
npm install styled-components

# or

yarn add styled-components
```

<br>

`theme/styled.d.ts`

```ts
import 'styled-components';
import { theme } from './index';

type ThemeConfig = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfig {}
}
```

</details>

<hr>
<br>

<h4>
<g-emoji class="g-emoji" alias="woman_singer" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f469-1f3a4.png">👩&zwj;🎤</g-emoji>
Using with Emotion</h4>

##### 🚩 Installation

```sh
npm install @emotion/{styled,react}

# or

yarn add @emotion/{styled,react}
```

<br >

`theme/emotion.d.ts`

```ts
import '@emotion/react';
import { theme } from './index';

type ThemeConfig = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeConfig {}
}
```

<hr/>
<br>

### 🚀 Integration to Your App

<br>

`app.tsx`

```tsx
import styled { ThemeProvider } from 'styled-components'; // or '@emotion/react'
import { theme } from './theme';

const Box = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <Box />
  </ThemeProvider>
);
```

<br>

## Media queries API

🚀 Caching is implemented in all functions to optimize performance.

<br>

### 👉🏻 Min-width - `up`

```tsx
const Box = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;
```

<br>
<strong>Will convert to vanilla css:  </strong>

```css
@media (min-width: 768px) {
  display: block;
}
```

<hr/>
<br>

### 👉🏻 Max-width - `down`

We occasionally use media queries that go in the other direction (the given screen size or smaller):

<br>

```tsx
const Box = styled.div`
  display: block;

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: none;
  }
`;
```

<br>
<strong>Will convert to vanilla css: </strong>

```css
@media (max-width: 767.98px) {
  display: none;
}
```

<br>

> <strong>Why subtract .02px?</strong> Browsers don’t currently support [range context queries](https://www.w3.org/TR/mediaqueries-4/#range-context), so we work around the limitations of [min- and max- prefixes](https://www.w3.org/TR/mediaqueries-4/#mq-min-max) and viewports with fractional widths (which can occur under certain conditions on high-dpi devices, for instance) by using values with higher precision.

<hr/>
<br>

### 👉🏻 Single breakpoint - `only`

There are also media queries and mixins for targeting a single segment of screen sizes using the minimum and maximum breakpoint widths.

<br>

```tsx
const Box = styled.div`
  background-color: pink;

  ${({ theme }) => theme.breakpoints.only('md')} {
    background-color: rebeccapurple;
  }
`;
```

<br>
<strong>Will convert to vanilla css: </strong>

```css
@media (min-width: 768px) and (max-width: 991.98px) {
  background-color: rebeccapurple;
}
```

<hr/>
<br>

### 👉🏻 Breakpoints range - `between`

Similarly, media queries may span multiple breakpoint widths.

<br>

```tsx
const Box = styled.div`
  background-color: gold;

  ${({ theme }) => theme.breakpoints.between('md', 'xl')} {
    background-color: rebeccapurple;
  }
`;
```

<br>
<strong>Will convert to vanilla css: </strong>

```css
@media (min-width: 768px) and (max-width: 1199.98px) {
  background-color: rebeccapurple;
}
```

<hr/>
<br>

## 👉🏻 `useMediaQuery` hook

features:

- 🧐 optimal performance by dynamically monitoring document changes in media queries.
- 💪🏻 It supports SSR (server-side rendering).
- 📦 Minified and gzipped size 284b.

<br>

<details><summary><strong>Type declaration</strong></summary>

```ts
 declare function useMediaQuery(query: string) => boolean
```

</details>

```tsx
import { useTheme } from 'styled-components'; // or from '@emotion/react'
import { useMediaQuery } from 'styled-breakpoints/use-media-query';
import { Box } from 'third-party-library';

const SomeComponent = () => {
  const { only } = useTheme().breakpoints;
  const isMd = useMediaQuery(only('md'));

  return <AnotherComponent>{isMd && <Box />}</AnotherComponent>;
};
```

<hr/>
<br>

## License

MIT License

Copyright (c) 2018-2024 [Maxim Alyoshin](https://github.com/mg901).

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mg901/styled-breakpoints/blob/master/LICENCE) file for details.

<hr>
<br>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mg901"><img src="https://avatars.githubusercontent.com/u/7874664?v=4?s=100" width="100px;" alt="mg901"/><br /><sub><b>mg901</b></sub></a><br /><a href="#question-mg901" title="Answering Questions">💬</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=mg901" title="Code">💻</a> <a href="#design-mg901" title="Design">🎨</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=mg901" title="Documentation">📖</a> <a href="#example-mg901" title="Examples">💡</a> <a href="#infra-mg901" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-mg901" title="Maintenance">🚧</a> <a href="#projectManagement-mg901" title="Project Management">📆</a> <a href="#promotion-mg901" title="Promotion">📣</a> <a href="#research-mg901" title="Research">🔬</a> <a href="https://github.com/mg901/styled-breakpoints/pulls?q=is%3Apr+reviewed-by%3Amg901" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=mg901" title="Tests">⚠️</a> <a href="#tool-mg901" title="Tools">🔧</a> <a href="#tutorial-mg901" title="Tutorials">✅</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://t.me/stuneak"><img src="https://avatars.githubusercontent.com/u/22033385?v=4?s=100" width="100px;" alt="Abu Shamsutdinov"/><br /><sub><b>Abu Shamsutdinov</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Astuneak" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=stuneak" title="Code">💻</a> <a href="#example-stuneak" title="Examples">💡</a> <a href="#ideas-stuneak" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/mg901/styled-breakpoints/pulls?q=is%3Apr+reviewed-by%3Astuneak" title="Reviewed Pull Requests">👀</a> <a href="#talk-stuneak" title="Talks">📢</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sergeysova.com/"><img src="https://avatars.githubusercontent.com/u/5620073?v=4?s=100" width="100px;" alt="Sova"/><br /><sub><b>Sova</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=sergeysova" title="Code">💻</a> <a href="#example-sergeysova" title="Examples">💡</a> <a href="#ideas-sergeysova" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/mg901/styled-breakpoints/pulls?q=is%3Apr+reviewed-by%3Asergeysova" title="Reviewed Pull Requests">👀</a> <a href="#talk-sergeysova" title="Talks">📢</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jussikinnula.com/"><img src="https://avatars.githubusercontent.com/u/7287118?v=4?s=100" width="100px;" alt="Jussi Kinnula"/><br /><sub><b>Jussi Kinnula</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Ajussikinnula" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=jussikinnula" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rafauke"><img src="https://avatars.githubusercontent.com/u/9576167?v=4?s=100" width="100px;" alt="Rafał Wyszomirski"/><br /><sub><b>Rafał Wyszomirski</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=rafauke" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://afflite.com/"><img src="https://avatars.githubusercontent.com/u/35396312?v=4?s=100" width="100px;" alt="Adrian Celczyński"/><br /><sub><b>Adrian Celczyński</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3AGR34SE" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=GR34SE" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/samholmes"><img src="https://avatars.githubusercontent.com/u/517469?v=4?s=100" width="100px;" alt="Sam Holmes"/><br /><sub><b>Sam Holmes</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=samholmes" title="Code">💻</a> <a href="#ideas-samholmes" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ontopic"><img src="https://avatars.githubusercontent.com/u/1599991?v=4?s=100" width="100px;" alt="Ontopic"/><br /><sub><b>Ontopic</b></sub></a><br /><a href="#ideas-Ontopic" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/iRyanBell"><img src="https://avatars.githubusercontent.com/u/25379378?v=4?s=100" width="100px;" alt="Ryan Bell"/><br /><sub><b>Ryan Bell</b></sub></a><br /><a href="#ideas-iRyanBell" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bartnagel.ca/"><img src="https://avatars.githubusercontent.com/u/199635?v=4?s=100" width="100px;" alt="Bart Nagel"/><br /><sub><b>Bart Nagel</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Atremby" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=tremby" title="Code">💻</a> <a href="#example-tremby" title="Examples">💡</a> <a href="#ideas-tremby" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://mckelveygreg.github.io/"><img src="https://avatars.githubusercontent.com/u/16110122?v=4?s=100" width="100px;" alt="Greg McKelvey"/><br /><sub><b>Greg McKelvey</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=mckelveygreg" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bdefore"><img src="https://avatars.githubusercontent.com/u/142472?v=4?s=100" width="100px;" alt="Buck DeFore"/><br /><sub><b>Buck DeFore</b></sub></a><br /><a href="#ideas-bdefore" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.pierreburel.com/"><img src="https://avatars.githubusercontent.com/u/37228?v=4?s=100" width="100px;" alt="Pierre Burel"/><br /><sub><b>Pierre Burel</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Apierreburel" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/flagoon"><img src="https://avatars.githubusercontent.com/u/20648154?v=4?s=100" width="100px;" alt="Pawel Kochanek"/><br /><sub><b>Pawel Kochanek</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Aflagoon" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=flagoon" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/iandjx"><img src="https://avatars.githubusercontent.com/u/3683356?v=4?s=100" width="100px;" alt="Ian Christopher B. de Jesus"/><br /><sub><b>Ian Christopher B. de Jesus</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Aiandjx" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/daviddelusenet"><img src="https://avatars.githubusercontent.com/u/1398418?v=4?s=100" width="100px;" alt="David de Lusenet"/><br /><sub><b>David de Lusenet</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Adaviddelusenet" title="Bug reports">🐛</a> <a href="#ideas-daviddelusenet" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AdlerJS"><img src="https://avatars.githubusercontent.com/u/82471930?v=4?s=100" width="100px;" alt="Dan Adler"/><br /><sub><b>Dan Adler</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3AAdlerJS" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
