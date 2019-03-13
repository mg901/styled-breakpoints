module.exports = {
  collectCoverage: false,
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.js$',
  coveragePathIgnorePatterns: ['/node_modules/'],
};
