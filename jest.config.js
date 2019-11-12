module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
};
