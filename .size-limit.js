module.exports = [
  {
    name: 'createBreakpointsApi',
    path: './core/create-breakpoints/index.prod.js',
    import: '{ createBreakpointsApi }',
    limit: '280 B',
  },
  {
    name: 'breakpoints.dev',
    path: './core/create-breakpoints/index.dev.js',
    import: '{ createBreakpointsApi }',
    limit: '790 B',
  },
  {
    name: 'styled-breakpoints',
    path: './styled-breakpoints/create-styled-breakpoints-theme/index.js',
    import: '{ createStyledBreakpointsTheme }',
    limit: '693 B',
  },
  {
    name: 'useMediaQuery',
    path: './use-media-query/index.js',
    import: '{ useMediaQuery }',
    limit: '313 B',
  },
  {
    name: 'styled-breakpoints + useMediaQuery',
    import: {
      './styled-breakpoints/create-styled-breakpoints-theme/index.js':
        '{ createStyledBreakpointsTheme }',
      './use-media-query/index.js': '{ useMediaQuery }',
    },
    limit: '908 kB',
  },
];
