module.exports = [
  {
    name: 'createBreakpointsApi',
    path: './shared/create-breakpoints-api/create-breakpoints-api.prod.js',
    import: '{ createBreakpointsApi }',
    limit: '360 B',
  },
  {
    name: 'breakpoints.dev',
    path: './shared/create-breakpoints-api/create-breakpoints-api.dev.js',
    import: '{ createBreakpointsApi }',
    limit: '950 B',
  },
  {
    name: 'styled-breakpoints',
    path: './styled-breakpoints/create-styled-breakpoints-theme/index.js',
    import: '{ createStyledBreakpointsTheme }',
    limit: '900 B',
  },
  {
    name: 'styled-breakpoints + useMediaQuery',
    path: './use-media-query/index.js',
    import: '{ useMediaQuery }',
    limit: '350 B',
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
