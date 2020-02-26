<div align="center">
<h1>
 💅 <br>
 styled-breakpoints <br>

<a href="https://travis-ci.org/mg901/styled-breakpoints">
<img alt="build status" src="https://img.shields.io/travis/mg901/styled-breakpoints/master.svg?style=flat-square">
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
</div>
<br>
<br>
<br>

## Demo sandbox

[![Edit styled-breakpoints with TypeScript](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/tender-moon-6q6w8?fontsize=14&module=%2Fsrc%2Flayout.tsx)

## Introduction

<p>Styled Breakpoints is simple and powerful tool for creating breakpoints in <a href="https://github.com/styled-components/styled-components">Styled Components</a>, <a href="https://github.com/emotion-js/emotion">Emotion</a>,  with  <strong>TypeScript</strong> type annotations out of the box.</p>

## Installation

```
yarn add styled-breakpoints
```

```
npm i styled-breakpoints
```

## Usage

### With Default breakpoints

```js
{
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
}
```

```js
import styled from 'styled-components';
import { up, down, between, only } from 'styled-breakpoints';

const Component = styled.div`
  color: black;

  ${down('tablet')} {
    color: lightcoral;
  }

  ${only('tablet')} {
    color: rebeccapurple;
  }

  ${between('tablet', 'desktop')} {
    color: hotpink;
  }

  ${up('lgDesktop')} {
    color: hotpink;
  }
`;
```

### Custom breakpoints

Breakpoints like [Bootstrap responsive breakpoints](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints).

```jsx
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { up, down, between, only } from 'styled-breakpoints';

const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
};

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

## API

<strong>All incoming values are converted to em.</strong>

For example, let's take default values of breakpoints.

### up

```js
/**
 *
 * @param {string} breakpoint name
 * @param {string} [orientation]
 *
 * @return {string} media quiery
 */
up('tablet') => '@media (min-width: 768px) { ... }'
```

### down

We occasionally use media queries that go in the other direction (the given screen size or smaller):

```js
/**
 *
 * @param {string} breakpoint name
 * @param {string} [orientation]
 *
 * @return {string} media quiery
 */
  down('tablet') => '@media (max-width: 991.98px) { ... }'
```

<br/>

> Note that since browsers do not currently support [range context queries](https://www.w3.org/TR/mediaqueries-4/#range-context), we work around the limitations of [min- and max- prefixes](https://www.w3.org/TR/mediaqueries-4/#mq-min-max) and viewports with fractional widths (which can occur under certain conditions on high-dpi devices, for instance) by using values with higher precision for these comparisons.

<br/>

Similarly, media queries may span multiple breakpoint widths:

### between

```js
/**
 *
 * @param {string} min breakpoint name
 * @param {string} max breakpoint name
 * @param {string} [orientation]
 *
 * @return {string} media quiery
 */
between('tablet', 'desktop') => '@media (min-width: 768px) and (max-width: 1199.98px) { ... }'
```

### only

```js
/**
 *
 * @param {string} breakpoint name
 * @param {string} [orientation]
 *
 * @return {string} media quiery
 */
only('tablet') => '@media (min-width: 768px) and (max-width: 991.98px) { ... }'
```

## License

MIT License

Copyright (c) 2018-2019 [Maxim Alyoshin](https://github.com/mg901).

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/mg901/styled-breakpoints/blob/master/LICENCE) file for details.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mg901"><img src="https://avatars0.githubusercontent.com/u/7874664?v=4" width="100px;" alt=""/><br /><sub><b>Maxim</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=mg901" title="Code">💻</a> <a href="#design-mg901" title="Design">🎨</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=mg901" title="Documentation">📖</a> <a href="#example-mg901" title="Examples">💡</a> <a href="#ideas-mg901" title="Ideas, Planning, & Feedback">🤔</a> <a href="#talk-mg901" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/stuneak"><img src="https://avatars0.githubusercontent.com/u/22033385?v=4" width="100px;" alt=""/><br /><sub><b>Abu Shamsutdinov</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=stuneak" title="Code">💻</a> <a href="#example-stuneak" title="Examples">💡</a> <a href="#ideas-stuneak" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/mg901/styled-breakpoints/pulls?q=is%3Apr+reviewed-by%3Astuneak" title="Reviewed Pull Requests">👀</a> <a href="#talk-stuneak" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/sergeysova"><img src="https://avatars0.githubusercontent.com/u/5620073?v=4" width="100px;" alt=""/><br /><sub><b>Sergey Sova</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/commits?author=sergeysova" title="Code">💻</a> <a href="#example-sergeysova" title="Examples">💡</a> <a href="#ideas-sergeysova" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/mg901/styled-breakpoints/pulls?q=is%3Apr+reviewed-by%3Asergeysova" title="Reviewed Pull Requests">👀</a> <a href="#talk-sergeysova" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/jussikinnula"><img src="https://avatars0.githubusercontent.com/u/7287118?v=4" width="100px;" alt=""/><br /><sub><b>Jussi Kinnula</b></sub></a><br /><a href="https://github.com/mg901/styled-breakpoints/issues?q=author%3Ajussikinnula" title="Bug reports">🐛</a> <a href="https://github.com/mg901/styled-breakpoints/commits?author=jussikinnula" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
