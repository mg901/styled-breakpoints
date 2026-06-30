import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

const dir = 'dist/dev/';

export default defineConfig({
  plugins: [dts()],
  input: 'src/styled-breakpoints/index.ts',
  output: {
    dir,
    format: 'esm',
    sourcemap: true,
  },
});
