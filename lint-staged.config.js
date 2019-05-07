module.exports = {
  linters: {
    '*.{js}': ['eslint --fix', 'prettier --write', 'git add'],
  },
};
