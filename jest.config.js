module.exports = {
  collectCoverage: false,
  roots: ['<rootDir>/__tests__'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  coveragePathIgnorePatterns: ['/node_modules/'],
};
