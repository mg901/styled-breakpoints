const {
  createStyledBreakpoints,
  createTheme,
} = require('./styled-breakpoints');

const { up, down, between, only } = createStyledBreakpoints();

module.exports = {
  up,
  down,
  between,
  only,
  createTheme,
};
