import flow from 'rollup-plugin-flow';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import flowEntry from 'rollup-plugin-flow-entry';
import { main, module, dependencies, peerDependencies } from './package.json';

const configuredFlow = flow({ all: true, pretty: true });

export default [
  {
    input: './src/index.js',
    output: {
      file: main,
      format: 'cjs',
      indent: false,
      sourcemap: true,
    },
    external: [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ],
    plugins: [
      configuredFlow,
      babel(),
      uglify(),
      resolve(),
      commonjs(),
      flowEntry(),
    ],
  },
  {
    input: './src/index.js',
    output: {
      file: module,
      format: 'es',
      indent: false,
      sourcemap: true,
    },
    external: [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ],
    plugins: [
      configuredFlow,
      resolve(),
      babel(),
      terser(),
      commonjs(),
      flowEntry(),
    ],
  },
];
