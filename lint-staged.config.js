module.exports = {
  'lint-staged': {
    linters: {
      '*.{json,js}': ['eslint --fix', 'prettier --write', 'git add'],
    },
  },
};
