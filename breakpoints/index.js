if (process.env.NODE_ENV === 'production') {
  module.exports = require('./breakpoints.js');
} else {
  module.exports = require('./breakpoints.dev.js');
}
