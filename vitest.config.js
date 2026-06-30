import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['lcov'],
      exclude: [
        ...configDefaults.exclude,
        '*.config.js',
        '.eslintrc.js',
        '.size-limit.js',
      ],
    },
  },
});
