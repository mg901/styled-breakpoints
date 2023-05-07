if (process.env.NODE_ENV === 'production') {
  module.exports = require('./create-breakpoints.prod');
} else {
  module.exports = require('./create-breakpoints.dev');
}
