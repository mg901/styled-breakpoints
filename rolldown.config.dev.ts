import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

const dir = 'dist';

export default defineConfig({
  plugins: [dts()],
  input: 'src/styled-breakpoints/index.ts',
  output: {
    dir: `${dir}/dev`,
    format: 'esm',
    sourcemap: true,
  },
});
