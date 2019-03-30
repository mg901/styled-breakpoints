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
<a href="https://bundlephobia.com/result?p=styled-breakpoints@6.6.1">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/styled-breakpoints.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/styled-breakpoints">
<img alt="npm version" src="https://img.shields.io/npm/v/styled-breakpoints.svg?style=flat-square">
</a>
<a href="https://greenkeeper.io/">
<img alt="greenkeeper badge" src="https://badges.greenkeeper.io/mg901/styled-breakpoints.svg?style=flat-square">
</a>
<a href="https://github.com/prettier/prettier">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</a>
<a href="https://github.com/semantic-release/semantic-release">
<img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square">
</a>
<a href="https://github.com/all-contributors/all-contributors-cli">
<img alt="all contributors" src="https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square">
</a>
</h1>
</div>
<br>
<br>
<br>


## Demo sandbox

[![Edit Styled breakpoints demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/23583q00o0?hidenavigation=1)

## Introduction
<p>Styled Breakpoints is simple and powerful tool for creating breakpoints in <a href="https://github.com/styled-components/styled-components">styled-components</a> or <a href="https://github.com/emotion-js/emotion">emotion</a> with  <strong>TypeScript</strong> and <strong>Flow</strong> type annotations out of the box.</p>


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
  // tablets, 768px and up
  up('tablet') => '@media (min-width: 768px) { ... }'
  ```

### down

  We occasionally use media queries that go in the other direction (the given screen size or smaller):
  
```js
  down('tablet') => '@media (max-width: 991.98px) { ... }'
  ```


<br/>

  >Note that since browsers do not currently support [range context queries](https://www.w3.org/TR/mediaqueries-4/#range-context), we work around the limitations of [min- and max- prefixes](https://www.w3.org/TR/mediaqueries-4/#mq-min-max) and viewports with fractional widths (which can occur under certain conditions on high-dpi devices, for instance) by using values with higher precision for these comparisons.

<br/>


Similarly, media queries may span multiple breakpoint widths:

### between

  ```js
  between('tablet', 'desktop') => '@media (min-width: 768px) and (max-width: 1199.98px) { ... }'
  ```

### only

  ```js
  only('tablet') => '@media (min-width: 768px) and (max-width: 991.98px) { ... }'
  ```

## License

MIT License

Copyright (c) 2018-2019 [Maxim Alyoshin](https://github.com/mg901).

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/mg901/styled-breakpoints/blob/master/LICENCE) file for details.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/7874664?v=4" width="100px;"/><br /><sub><b>Maxim</b></sub>](https://t.me/mg901)<br />[💻](https://github.com/mg901/styled-breakpoints/commits?author=mg901 "Code") [🎨](#design-mg901 "Design") [📖](https://github.com/mg901/styled-breakpoints/commits?author=mg901 "Documentation") [💡](#example-mg901 "Examples") [🤔](#ideas-mg901 "Ideas, Planning, & Feedback") [📢](#talk-mg901 "Talks") | [<img src="https://avatars0.githubusercontent.com/u/22033385?v=4" width="100px;"/><br /><sub><b>Abu Shamsutdinov</b></sub>](https://github.com/yakotika)<br />[💻](https://github.com/mg901/styled-breakpoints/commits?author=yakotika "Code") [💡](#example-yakotika "Examples") [🤔](#ideas-yakotika "Ideas, Planning, & Feedback") [👀](#review-yakotika "Reviewed Pull Requests") [📢](#talk-yakotika "Talks") | [<img src="https://avatars0.githubusercontent.com/u/5620073?v=4" width="100px;"/><br /><sub><b>Sergey Sova</b></sub>](https://sergeysova.com)<br />[💻](https://github.com/mg901/styled-breakpoints/commits?author=sergeysova "Code") [💡](#example-sergeysova "Examples") [🤔](#ideas-sergeysova "Ideas, Planning, & Feedback") [👀](#review-sergeysova "Reviewed Pull Requests") [📢](#talk-sergeysova "Talks") |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
