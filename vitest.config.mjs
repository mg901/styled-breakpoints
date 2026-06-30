// eslint-disable-next-line import/no-unresolved
import { defineConfig, configDefaults } from 'vitest/config';
import codspeedPlugin from '@codspeed/vitest-plugin';

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
    environment: 'jsdom', // вместо node
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
