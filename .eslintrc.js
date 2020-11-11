module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  ignorePatterns: ['**/*.d.ts'],
  rules: {
    'newline-before-return': 2,
    'no-unused-vars': 2,
    'no-console': 2,
    'import/no-default-export': 2,
    'import/no-self-import': 2,
    'import/no-named-as-default': 2,
    'arrow-body-style': 2,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
