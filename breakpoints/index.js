if (process.env.NODE_ENV === 'production') {
  module.exports = require('./create-breakpoints-api.prod');
} else {
  module.exports = require('./create-breakpoints-api.dev');
}
