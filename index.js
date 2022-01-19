const {
  createStyledBreakpoints,
  createTheme,
} = require('./styled-breakpoints');

const { up, down, only, between } = createStyledBreakpoints();

module.exports = {
  up,
  down,
  only,
  between,
  createTheme,
};
