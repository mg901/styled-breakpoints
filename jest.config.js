module.exports = {
  collectCoverage: false,
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.js$',
  coveragePathIgnorePatterns: ['/node_modules/'],
};
