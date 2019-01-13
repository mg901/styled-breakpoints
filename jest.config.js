module.exports = {
  collectCoverage: false,
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  coveragePathIgnorePatterns: ['/node_modules/'],
};
