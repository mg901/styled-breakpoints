const { makeStyledBreakpoints } = require('./core/make-styled-breakpoints');

const { up, down, between, only } = makeStyledBreakpoints();

exports.up = up;
exports.down = down;
exports.between = between;
exports.only = only;
