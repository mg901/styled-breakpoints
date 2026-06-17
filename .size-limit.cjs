module.exports = [
  {
    name: 'createBreakpoints',
    path: './core/create-breakpoints/index.prod.js',
    import: '{ createBreakpoints }',
    limit: '160 B',
  },
  {
    name: 'breakpoints.dev',
    path: './core/create-breakpoints/index.dev.js',
    import: '{ createBreakpoints }',
    limit: '600 B',
  },
  {
    name: 'styled-breakpoints',
    path: './styled-breakpoints/create-styled-breakpoints-theme/index.js',
    import: '{ createStyledBreakpointsTheme }',
    limit: '500 B',
  },
  {
    name: 'useMediaQuery',
    path: './use-media-query/index.js',
    import: '{ useMediaQuery }',
    limit: '317 B',
  },
  {
    name: 'styled-breakpoints + useMediaQuery',
    import: {
      './styled-breakpoints/create-styled-breakpoints-theme/index.js':
        '{ createStyledBreakpointsTheme }',
      './use-media-query/index.js': '{ useMediaQuery }',
    },
    limit: '630 B',
  },
];
