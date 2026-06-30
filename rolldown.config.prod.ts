import { defineConfig } from 'rolldown';

const dir = 'dist/prod/';

export default defineConfig({
  input: 'src/styled-breakpoints/create-theme/index.ts',
  output: [
    {
      dir,
      format: 'esm',
    },
  ],
});
