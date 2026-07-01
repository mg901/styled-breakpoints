import { defineConfig, configDefaults } from 'vitest/config';
import codspeedPlugin from '@codspeed/vitest-plugin';

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
    globals: true,
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
