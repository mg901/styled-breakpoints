# styled-breakpoints

Simple and powerfull css breakpoints for [styled-components](https://github.com/styled-components/styled-components).

# Installation

Use yarn or npm

```
yarn add styled-breakpoints
```

```
npm i styled-breakpoints
```

# Get Started

Еhe following values of breakpoints are used by default.

```js
{
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
}
```

```js
import styled from 'styled-components';
import media from 'styled-breakpoints';

const Test = styled.div`
  background-color: pink;

  ${media.above('tablet')`
    background-color: hotpink;
  `};

  ${media.below('desktop')`
    background-color: lightcoral;
  `};

  ${media.only('tablet')`
    background-color: rebeccapurple;
  `};

  ${media.between('tablet', 'desktop')`
    background-color: hotpink;
  `};
`;
```

Convert to pure css:

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

/* (1200px - 0.02px) / 16px */
@media screen and (max-width: 74.99875em) {
  div {
    background-color: lightcoral;
  }
}

/* 778px / 16px          (992px - 0.02px) / 16px */
@media screen and (min-width: 48em) and (max-width: 61.99875em) {
  div {
    background-color: rebeccapurple;
  }
}

/* 778px / 16px          (1200px - 0.02px) / 16px */
@media screen and (min-width: 48em) and (max-width: 74.99875em) {
  div {
    background-color: hotpink;
  }
}
```

# Custom breakpoints

```js
const media = createBreakpoints({
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
});
```

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
