# styled-breakpoints

Simple and powerfull css breakpoints for [styled-components](https://github.com/styled-components/styled-components).

> You can use it with [emotion](https://github.com/emotion-js/emotion) too

## Demo Sandbox

[code](https://codesandbox.io/s/23583q00o0)

[fullscreen](https://23583q00o0.codesandbox.io/)

## Installation

Use yarn or npm

```
yarn add styled-breakpoints
```

```
npm i styled-breakpoints
```

## Get Started

The following values of breakpoints are used by default.

```js
const defaultBreakpoints = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};
```

```js
import styled from 'styled-components';
import { above, below, between, only } from 'styled-breakpoints';

const SyledComponent = styled.div`
  background-color: pink;

  ${above('tablet')} {
    background-color: hotpink;
  }
`;
```

Converts to pure css:

```css
div {
  background-color: pink;
}
/* 768px / 16px */
@media screen and (min-width: 48em) {
  div {
    background-color: hotpink;
  }
}
```

### Above

```js
css`
  ${above('tablet')} {
    background-color: hotpink;
  }
`;
```

Converts to:

```css
@media screen and (min-width: 48em) {
  div {
    background-color: hotpink;
  }
}
```

### Below

```js
css`
  ${below('desktop')} {
    background-color: lightcoral;
  }
`;
```

Converts to:

```css
/* (1200px - 0.02px) / 16px */
@media screen and (max-width: 74.99875em) {
  div {
    background-color: lightcoral;
  }
}
```

### Between

```js
css`
  ${between('tablet', 'desktop')} {
    background-color: hotpink;
  }
`;
```

Converts to:

```css
/* 778px / 16px                  (1200px - 0.02px) / 16px */
@media screen and (min-width: 48em) and (max-width: 74.99875em) {
  div {
    background-color: hotpink;
  }
}
```

### Only

```js
css`
  ${only('tablet')} {
    background-color: rebeccapurple;
  }
`;
```

Converts to:

```css
/*
  778px / 16px                  (992px - 0.02px) / 16px */
@media screen and (min-width: 48em) and (max-width: 61.99875em) {
  div {
    background-color: rebeccapurple;
  }
}
```

### Custom breakpoints

```js
import styled from 'styled-components';
import { createBreakpoints } from 'styled-breakpoints';

const { above, below, between, only } = createBreakpoints({
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
});

const StyledComponent = styled.div`
  background-color: pink;

  ${above('md')} {
    background-color: hotpink;
  }
`;
```

## License

MIT License

Copyright (c) 2018 Maxim Alyoshin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
