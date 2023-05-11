module.exports = [
  {
    name: 'breakpoints',
    path: './breakpoints/create-breakpoints.prod.js',
    import: '{ createBreakpoints }',
    limit: '237 B',
  },
  {
    name: 'breakpoints.dev',
    path: './breakpoints/create-breakpoints.dev.js',
    import: '{ createBreakpoints }',
    limit: '782 B',
  },
  {
    name: 'styled-breakpoints',
    path: './styled-breakpoints/index.js',
    import: '{ createStyledBreakpointsTheme }',
    limit: '705 B',
  },
  // {
  //   name: 'styled-breakpoints + useMediaQuery',
  //   import: {
  //     './styled-breakpoints/index.js': '{ createStyledBreakpointsTheme }',
  //     './use-media-query/index.js': '{ useMediaQuery }',
  //   },
  //   limit: '966 B',
  // },
];
