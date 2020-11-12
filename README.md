<!-- <div align="center">
<p>
<a href="https://www.styled-components.com" rel="nofollow">
    <img alt="styled-components" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" height="80px">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;<strong>OR</strong>&nbsp;&nbsp;&nbsp;
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/b9a50ea4bd673e101986a46f5e4a36e3bc52afdd4560f496f3384a320fcf3842/68747470733a2f2f63646e2e7261776769742e636f6d2f746b6834342f656d6f74696f6e2f6d61737465722f656d6f74696f6e2e706e67"><img src="https://camo.githubusercontent.com/b9a50ea4bd673e101986a46f5e4a36e3bc52afdd4560f496f3384a320fcf3842/68747470733a2f2f63646e2e7261776769742e636f6d2f746b6834342f656d6f74696f6e2f6d61737465722f656d6f74696f6e2e706e67" alt="emotion" height="80" width="80" data-canonical-src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png"></a>

  <p>
</div> -->

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
<br>
<br>

## Mobile First

[![Edit styled-breakpoints with TypeScript](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/tender-moon-6q6w8?fontsize=14&module=%2Fsrc%2Flayout.tsx)

## Desktop First

[![Edit styled-breakpoints with TypeScript](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/tender-moon-6q6w8?fontsize=14&module=%2Fsrc%2Flayout.tsx)

## Hooks API

[![Edit styled-breakpoints with TypeScript](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/tender-moon-6q6w8?fontsize=14&module=%2Fsrc%2Flayout.tsx)

## Documentation

- [Installation](#installation)
- [Getting Started](#getting-started)

  - [default breakpoints](#default-breakpoints)
  - [custom breakpoints](#custom-breakpoints)
  - [object notation](#object-notation)

- [API](#api)

  - [core](#core)

    - [up](#up)
    - [down](#down)
    - [between](#between)
    - [only](#only)

  - [hooks](#hooks-api)

    - [styled components](#react)
    - [emotion](#react)

- [License](#license)
- [Contributors](#contributors)

## Installation

```
yarn add styled-breakpoints
```

```
npm i styled-breakpoints
```

## Getting Started

### Default breakpoints

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

  ${only('tablet')} {
    color: rebeccapurple;
  }
`;
```

### Custom breakpoints

```jsx
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

### Object notation

When using object notation, make sure to explicitly pass `props` to breakpoint
methods. Please see the example below using default configuration:

```js
import styled from 'styled-components';
import { down, between } from 'styled-breakpoints';

const Component = styled('div')((props) => ({
  color: 'black',
  [down('tablet')(props)]: {
    color: 'lightcoral',
  },
  [between('sm', 'md')(props)]: {
    color: 'hotpink',
  },
}));
```

## API

### Core

Core API is inspired by [Bootstrap responsive breakpoints](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints).

> All incoming values are converted to em

For example, let's take default values of breakpoints.

#### up

```js
/**
 *
 * @param {string} min-width
 * @param {string} [orientation]
 *
 * @return {string} media quiery
 */
up('tablet') => '@media (min-width: 768px) { ... }'
```

#### down

We occasionally use media queries that go in the other direction (the given screen size or smaller):

```js
/**
 *
 * @param {string} max-width
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

#### between

```js
/**
 *
 * @param {string} min-width
 * @param {string} max-width
 * @param {string} [orientation]
 *
 * @return {string} media quiery
 */
between('tablet', 'desktop') => '@media (min-width: 768px) and (max-width: 1199.98px) { ... }'
```

#### only

```js
/**
 *
 * @param {string} min-width
 * @param {string} [orientation]
 *
 * @return {string} media quiery
 */
only('tablet') => '@media (min-width: 768px) and (max-width: 991.98px) { ... }'
```

### Hooks

#### Styled Components

##### Installation

```
npm i react styled-components styled-breakpoints

# or

yarn add react styled-components styled-breakpoints
```

##### Usage

```jsx
import React from 'react';
import { useBreakpoint } from 'styled-breakpoints/react-styled';

const App = () => {
  const isMobile = useBreakpoint(down('tablet'));

  return <>{isMobile ? <Mobile /> : <Tablet>}</>
}
```

#### Emotion

##### Installation

```
npm i react styled-breakpoints @emotion/core @emotion/styled

# or

yarn add react styled-breakpoints @emotion/core @emotion/styled
```

##### Usage

```jsx
import React from 'react';
import { useBreakpoint } from 'styled-breakpoints/react-emotion';

const App = () => {
  const isMobile = useBraekpoint(down('tablet'));

  return <>{isMobile ? <Mobile /> : <Tablet>}</>
}
```

## License

MIT License

Copyright (c) 2018-2019 [Maxim Alyoshin](https://github.com/mg901).

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mg901/styled-breakpoints/blob/master/LICENCE) file for details.

## Contributors

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
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

```

```
