<div align="center">
<h1>
 💅 <br>
 styled-breakpoints <br>
<a href="https://travis-ci.org/mg901/styled-breakpoints">
<img alt="Build Status" src="https://travis-ci.org/mg901/styled-breakpoints.svg?branch=master">
</a>
<a href="https://coveralls.io/github/mg901/styled-breakpoints?branch=master">
<img alt="Coverage Status" src="https://coveralls.io/repos/github/mg901/styled-breakpoints/badge.svg?branch=master">
</a>
<a href="https://github.com/prettier/prettier">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>
<a href="https://github.com/semantic-release/semantic-release">
<img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
</a>
</h1>
<strong>Simple and powerful css breakpoints for styled-components and emotion.</strong>
</div>
<br>
<br>

## Demo sandbox

[![Edit Styled breakpoints demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/23583q00o0?hidenavigation=1)

## Installation

```
yarn add styled-breakpoints
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

  ${only('tablet')} {
    color: rebeccapurple;
  }

  ${between('tablet', 'desktop')} {
    color: hotpink;
  }

  ${down('desktop')} {
    color: lightcoral;
  }

  ${up('lgDesktop')} {
    color: hotpink;
  }
`;
```

### Custom breakpoints

Breakpoints line [Bootstrap responsive breakpoints](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints).

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

  ${only('xs')} {
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

## License

MIT License

Copyright (c) 2018-2019 [Maxim Alyoshin](https://github.com/mg901).

See [LICENSE](https://github.com/mg901/styled-breakpoints/blob/master/LICENCE) for more information.
