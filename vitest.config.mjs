// eslint-disable-next-line import/no-unresolved
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov'],
      exclude: [
        ...configDefaults.exclude,
        '*/**/*.types.ts',
        '*.config.js',
        '.eslintrc.js',
        '.size-limit.js',
      ],
    },
  },
});
