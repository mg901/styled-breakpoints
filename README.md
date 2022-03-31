<div align="center">
<h1>

<br/>
styled-breakpoints <br>

<a href="https://github.com/mg901/styled-breakpoints/actions?query=workflow%3Arelease">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/mg901/styled-breakpoints/release?style=flat-square">
</a>

<a href="https://coveralls.io/github/mg901/styled-breakpoints?branch=master">
<img alt="coverage status" src="https://img.shields.io/coveralls/github/mg901/styled-breakpoints/master.svg?style=flat-square">
</a>

<a href="https://bundlephobia.com/result?p=styled-breakpoints@6.8.0">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/styled-breakpoints.svg?style=flat-square">
</a>
<a href="https://img.shields.io/npm/dm/styled-breakpoints?style=flat-square">
  <img alt="npm downloads" src="https://img.shields.io/npm/dm/styled-breakpoints?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/styled-breakpoints">
<img alt="npm version" src="https://img.shields.io/npm/v/styled-breakpoints.svg?style=flat-square">
</a>
</h1>

<p>Simple and powerful tool for creating media queries with </p>

<p>
<a href="https://www.styled-components.com" rel="nofollow">
    <img alt="styled-components" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" height="80px">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;<strong>OR</strong>&nbsp;&nbsp;&nbsp;
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/b9a50ea4bd673e101986a46f5e4a36e3bc52afdd4560f496f3384a320fcf3842/68747470733a2f2f63646e2e7261776769742e636f6d2f746b6834342f656d6f74696f6e2f6d61737465722f656d6f74696f6e2e706e67"><img src="https://camo.githubusercontent.com/b9a50ea4bd673e101986a46f5e4a36e3bc52afdd4560f496f3384a320fcf3842/68747470733a2f2f63646e2e7261776769742e636f6d2f746b6834342f656d6f74696f6e2f6d61737465722f656d6f74696f6e2e706e67" alt="emotion" height="80" width="80" data-canonical-src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png"></a>

  <p>

</div>

## Core concepts

**Breakpoints are the building blocks of responsive design**. Use them to control when your layout can be adapted at a particular viewport or device size.

**Use media queries to architect your CSS by breakpoint**. Media queries are a feature of CSS that allow you to conditionally apply styles based on a set of browser and operating system parameters. We most commonly use <code>min-width</code> in our media queries.

**Mobile first, responsive design is the goal**. Styled Breakpoints aims to apply the bare minimum of styles to make a layout work at the smallest breakpoint, and then layers on styles to adjust that design for larger devices. This optimizes your CSS, improves rendering time, and provides a great experience for your visitors.

## Documentation

Examples

- [mobile first](#mobile-first)
- [desktop first](#desktop-first)
- [hooks api](#hooks-api)

Getting Started

- [Installation](#installation)
- [default breakpoints](#default-breakpoints)
- [customization](#customization)
- [object notation](#object-notation)

API

- [up](#up)
- [down](#down)
- [between](#between)
- [only](#only)
- [useBreakpoint](#useBreakpoint)

## Examples

### Mobile First

From smallest to largest

<a href="https://codesandbox.io/s/rough-wave-u0uuu?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp.tsx&theme=dark">
<img alt="Edit mobile-first" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

### Desktop First

From largest to smallest

<a href="https://codesandbox.io/s/desktop-first-example-0plsg?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp.tsx&theme=dark">
  <img alt="Edit desktop first example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

### Hooks API

#### Styled Components

<a href="https://codesandbox.io/s/styled-components-hooks-api-6q6w8?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp.tsx&theme=dark">
  <img alt="Hooks api (styled-components)" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

#### Emotion

<a href="https://codesandbox.io/s/styled-components-hooks-api-forked-duown?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp.tsx&theme=dark">
<img alt="Hooks api (Emotion)" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

### Installation

```sh
npm install styled-breakpoints

# or

yarn add styled-breakpoints

# or

pnpm add styled-breakpoints
```

### Available breakpoints

Styled Breakpoints includes six default breakpoints, sometimes referred to as grid tiers, for building responsively. These breakpoints can be customized. Each breakpoint was chosen to comfortably hold containers whose widths are multiples of 12. Breakpoints are also representative of a subset of common device sizes and viewport dimensions they don’t specifically target every use case or device. Instead, the ranges provide a strong and consistent foundation to build on for nearly any device.

```js
const defaultBreakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};
```

```js
import { up, down, between, only } from 'styled-breakpoints';

const Component = styled.div`
  color: black;

  ${only('md')} {
    color: rebeccapurple;
  }
`;
```

### Customization

```jsx
import { up, down, between, only, createTheme } from 'styled-breakpoints';

const theme = createTheme({
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
});

const Component = styled.div`
  color: black;

  ${only('sm')} {
    color: rebeccapurple;
  }

  ${between('sm', 'md')} {
    color: hotpink;
  }

  ${down('lg')} {
    color: lightcoral;
  }

  ${up('xl')} {
    color: hotpink;
  }
`;

<ThemeProvider theme={theme}>
  <Component>This is cool!</Component>
</ThemeProvider>;
```

### Object notation

Make sure to explicitly pass `props` to breakpoint
methods. Please see the example below using default configuration:

```js
import { down, between } from 'styled-breakpoints';

const Component = styled('div')((props) => ({
  color: 'black',
  [down('md')(props)]: {
    color: 'lightcoral',
  },
  [between('sm', 'md')(props)]: {
    color: 'hotpink',
  },
}));
```

### Hooks API

#### Styled Components

```jsx
import { useBreakpoint } from 'styled-breakpoints/react-styled';
```

#### Emotion

```jsx
import { useBreakpoint } from 'styled-breakpoints/react-emotion';
```

<br/>
<br/s>

## API

Core API is inspired by [Bootstrap responsive breakpoints](https://getbootstrap.com/docs/5.0/layout/breakpoints/).

For example, let's take default values of breakpoints.

### up

<details><summary><strong>Type declaration</strong></summary>

```ts
  declare function up(
    min: string,
    orientation?: 'portrait' | 'landscape'
  ) => any
```

</details>

```jsx
css`
  ${up('md')} {
    background-color: rebeccapurple;
  }
`;
```

<details><summary><strong>Convert to pure css: </strong></summary>

```css
@media (min-width: 768px) {
  background-color: rebeccapurple;
}
```

</details>

### down

<details><summary><strong>Type declaration</strong></summary>

```ts
  declare function down(
    max: string,
    orientation?: 'portrait' | 'landscape'
  ) => any
```

</details>

We occasionally use media queries that go in the other direction (the given screen size or smaller).

This function takes this declared breakpoint, subtracts 0.02px from it, and uses it as the maximum width value.

```tsx
css`
  ${down('md')} {
    background-color: rebeccapurple;
  }
`;
```

<details><summary><strong>Convert to: </strong></summary>

```css
@media (max-width: 767.98px) {
  background-color: rebeccapurple;
}
```

</details>

<br/>

> <strong>Why subtract .02px?</strong> Browsers don’t currently support [range context queries](https://www.w3.org/TR/mediaqueries-4/#range-context), so we work around the limitations of [min- and max- prefixes](https://www.w3.org/TR/mediaqueries-4/#mq-min-max) and viewports with fractional widths (which can occur under certain conditions on high-dpi devices, for instance) by using values with higher precision.

<br/>

### between

<details><summary><strong>Type declaration</strong></summary>

```ts
 declare function between(
    min: string,
    max: string,
    orientation?: 'portrait' | 'landscape'
  ) => any
```

</details>

Similarly, media queries may span multiple breakpoint widths:

```js
css`
  ${between('md', 'xl')} {
    background-color: rebeccapurple;
  }
`;
```

<details><summary><strong>Convert to: </strong></summary>

```css
@media (min-width: 768px) and (max-width: 1199.98px) {
  background-color: rebeccapurple;
}
```

</details>

### only

<details><summary><strong>Type declaration</strong></summary>

```ts
  declare function only(
    name: string,
    orientation?: 'portrait' | 'landscape'
  ) => any
```

</details>

There is also function for targeting a single segment of screen sizes using the minimum and maximum breakpoint widths.

```jsx
css`
  ${only('md')} {
    background-color: rebeccapurple;
  }
`;
```

<details><summary><strong>Convert to: </strong></summary>

```css
@media (min-width: 768px) and (max-width: 991.98px) {
  background-color: rebeccapurple;
}
```

</details>

### useBreakpoint

```js
/**
 * @param {function} up | down | between | only
 *
 * @return {(boolean|null)} `true` if currently matching the given query,
 *                          `false` if not, and `null` if unknown (such as
 *                          during server-side rendering)
 */
useBreakpoint(up('md')) => boolean | null
```

## Other

### License

MIT License

Copyright (c) 2018-2019 [Maxim Alyoshin](https://github.com/mg901).

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mg901/styled-breakpoints/blob/master/LICENCE) file for details.

### Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mg901"><img src="https://avatars0.githubusercontent.com/u/7874664?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maxim</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=mg901" title="Code">💻</a> <a href="#design-mg901" title="Design">🎨</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=mg901" title="Documentation">📖</a> <a href="#example-mg901" title="Examples">💡</a> <a href="#ideas-mg901" title="Ideas, Planning, & Feedback">🤔</a> <a href="#talk-mg901" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/stuneak"><img src="https://avatars0.githubusercontent.com/u/22033385?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abu Shamsutdinov</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=stuneak" title="Code">💻</a> <a href="#example-stuneak" title="Examples">💡</a> <a href="#ideas-stuneak" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/mg901/styled-breakpoints/pulls?q=is%3Apr+reviewed-by%3Astuneak" title="Reviewed Pull Requests">👀</a> <a href="#talk-stuneak" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/sergeysova"><img src="https://avatars0.githubusercontent.com/u/5620073?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sergey Sova</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=sergeysova" title="Code">💻</a> <a href="#example-sergeysova" title="Examples">💡</a> <a href="#ideas-sergeysova" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/mg901/styled-breakpoints/pulls?q=is%3Apr+reviewed-by%3Asergeysova" title="Reviewed Pull Requests">👀</a> <a href="#talk-sergeysova" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/jussikinnula"><img src="https://avatars0.githubusercontent.com/u/7287118?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jussi Kinnula</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Ajussikinnula" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=jussikinnula" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rafauke"><img src="https://avatars1.githubusercontent.com/u/9576167?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rafał Wyszomirski</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=rafauke" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/GR34SE"><img src="https://avatars1.githubusercontent.com/u/35396312?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adrian Celczyński</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3AGR34SE" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=GR34SE" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/alexolefirenko"><img src="https://avatars1.githubusercontent.com/u/7016947?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexey Olefirenko</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=alexolefirenko" title="Code">💻</a> <a href="#ideas-alexolefirenko" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/samholmes"><img src="https://avatars2.githubusercontent.com/u/517469?v=4?s=100" width="100px;" alt=""/><br /><sub><b>samholmes</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=samholmes" title="Code">💻</a> <a href="#ideas-samholmes" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Ontopic"><img src="https://avatars0.githubusercontent.com/u/1599991?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ontopic</b></sub></a><br /><a href="#ideas-Ontopic" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://iryanbell.com/"><img src="https://avatars0.githubusercontent.com/u/25379378?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ryan Bell</b></sub></a><br /><a href="#ideas-iRyanBell" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://bartnagel.ca/"><img src="https://avatars1.githubusercontent.com/u/199635?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bart Nagel</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Atremby" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=tremby" title="Code">💻</a> <a href="#example-tremby" title="Examples">💡</a> <a href="#ideas-tremby" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://mckelveygreg.github.io/"><img src="https://avatars2.githubusercontent.com/u/16110122?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Greg McKelvey</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=mckelveygreg" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bdefore"><img src="https://avatars.githubusercontent.com/u/142472?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Buck DeFore</b></sub></a><br /><a href="#ideas-bdefore" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.pierreburel.com/"><img src="https://avatars.githubusercontent.com/u/37228?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pierre Burel</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Apierreburel" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://oowl.dev/"><img src="https://avatars.githubusercontent.com/u/47437822?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Konstantin</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Aoowliq" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=oowliq" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

```

```
