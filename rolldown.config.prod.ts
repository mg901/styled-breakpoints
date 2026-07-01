import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

const dir = 'dist';

export default defineConfig([
  {
    input: 'src/styled-breakpoints/create-theme/index.ts',
    output: [
      {
        dir: `${dir}/prod/`,
        format: 'esm',
        minify: true,
      },
    ],
  },
  {
    plugins: [
      dts({
        sourcemap: false,
      }),
    ],
    external: ['react'],
    input: 'src/use-media-query',
    output: {
      dir: `${dir}/hook`,
      minify: true,
    },
  },
]);
