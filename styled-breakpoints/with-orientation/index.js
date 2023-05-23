if (process.env.NODE_ENV === 'production') {
  exports.withOrientation = require('./with-orientation.prod').withOrientation;
} else {
  exports.withOrientation = require('./with-orientation.dev').withOrientation;
}
