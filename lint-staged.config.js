module.exports = {
  'lint-staged': {
    '*.js': ['eslint --fix', 'prettier --write', 'git add'],
    '*.{json,js,eslintrc}': ['prettier --write', 'git add'],
  },
};
