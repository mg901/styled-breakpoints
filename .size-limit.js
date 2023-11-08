module.exports = [
  {
    name: 'breakpoints',
    path: './shared/breakpoints/create-breakpoints-api.prod.js',
    import: '{ createBreakpointsApi }',
    limit: '310 B',
  },
  {
    name: 'breakpoints.dev',
    path: './shared/breakpoints/create-breakpoints-api.dev.js',
    import: '{ createBreakpointsApi }',
    limit: '860 B',
  },
  {
    name: 'styled-breakpoints',
    path: './styled-breakpoints/create-styled-breakpoints-theme/index.js',
    import: '{ createStyledBreakpointsTheme }',
    limit: '780 B',
  },
  {
    name: 'styled-breakpoints + useMediaQuery',
    path: './use-media-query/index.js',
    import: '{ useMediaQuery }',
    limit: '324 B',
  },
  {
    name: 'styled-breakpoints + useMediaQuery',
    import: {
      './styled-breakpoints/index.js': '{ createStyledBreakpointsTheme }',
      './use-media-query/index.js': '{ useMediaQuery }',
    },
    limit: '1.1 kB',
  },
];
