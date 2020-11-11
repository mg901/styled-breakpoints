const { makeStyledBreakpoints } = require('./core');

const { up, down, between, only } = makeStyledBreakpoints();

module.exports = {
  up,
  down,
  between,
  only,
};
