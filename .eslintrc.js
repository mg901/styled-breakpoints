module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-unused-vars': 2,
    'no-console': 2,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-mutable-exports': 0,
    'prefer-template': 0,
    'no-var': 0,
    'vars-on-top': 0,
    'func-names': 0,
    'no-multi-assign': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'prefer-rest-params': 0,
    'prefer-destructuring': 0,
    'guard-for-in': 0,
    '@typescript-eslint/interface-name-prefix': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
