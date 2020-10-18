module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    'newline-before-return': 2,
    'no-console': 2,
    'import/no-default-export': 2,
    'import/no-self-import': 2,
    'import/no-named-as-default': 2,
    'arrow-body-style': 2,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
  },
  overrides: [
    {
      files: ['*.config.js'],
      rules: {
        'import/no-default-export': 0,
        'global-require': 0,
      },
    },
  ],
};
