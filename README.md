# styled-breakpoints [![Build Status](https://travis-ci.org/mg901/styled-breakpoints.svg?branch=master)](https://travis-ci.org/mg901/styled-breakpoints) [![Coverage Status](https://coveralls.io/repos/github/mg901/styled-breakpoints/badge.svg?branch=master)](https://coveralls.io/github/mg901/styled-breakpoints?branch=master) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Simple and powerful css breakpoints for [styled-components](https://github.com/styled-components/styled-components).

> You can use it with [emotion](https://github.com/emotion-js/emotion) too

## Demo Sandbox

[code](https://codesandbox.io/s/23583q00o0)

[fullscreen](https://23583q00o0.codesandbox.io/)

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

Copyright (c) 2018 [Maxim Alyoshin](https://github.com/mg901).

See [LICENSE](https://github.com/mg901/styled-breakpoints/blob/master/LICENCE) for more information.
