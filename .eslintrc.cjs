module.exports = {
  plugins: ['prettier', 'vitest'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'plugin:vitest/recommended',
  ],
  env: {
    es2023: true,
    node: true,
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
    'func-names': 0,
    'global-require': 0,
    'arrow-body-style': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  overrides: [
    {
      files: ['*.config.js', '*config.mjs'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
};
