import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const prod = process.env.PRODUCTION;
let config = {
  input: 'src/index.js',
  external: ['react', 'styled-components'],
};

const plugins = [resolve(), commonjs(), babel()];

if (prod) plugins.push(uglify());

if (process.env.BROWSER) {
  config = {
    ...config,
    output: {
      file: 'dist/styled-breakpoints.umd.js',
      sourcemap: true,
      format: 'umd',
      exports: 'named',
      name: 'styled-breakpoints',
    },
    plugins,
  };
} else if (process.env.COMMON) {
  config = {
    ...config,
    plugins: [resolve(), commonjs(), babel()],
    output: {
      file: 'dist/styled-breakpoints.common.js',
      format: 'cjs',
    },
  };
} else if (process.env.ES) {
  config = {
    ...config,
    plugins: [resolve(), commonjs(), babel()],
    output: {
      file: 'dist/styled-breakpoints.es.js',
      format: 'es',
    },
  };
}

export default config;
