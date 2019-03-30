import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { main, module, dependencies, peerDependencies } from './package.json';

export default [
  {
    input: './src/index.js',
    output: {
      file: main,
      format: 'cjs',
      indent: false,
    },
    external: [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ],
    plugins: [babel(), uglify(), resolve(), commonjs()],
  },
  {
    input: './src/index.js',
    output: {
      file: module,
      format: 'es',
      indent: false,
    },
    external: [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ],
    plugins: [resolve(), babel(), terser(), commonjs()],
  },
];
