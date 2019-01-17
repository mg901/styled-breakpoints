import flow from 'rollup-plugin-flow';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import flowEntry from 'rollup-plugin-flow-entry';
import pkg from './package.json';

const configuredFlow = flow({ all: true, pretty: true });

export default [
  // CommonJS
  {
    input: './src/index.js',
    output: {
      file: 'lib/styled-breakpoints.cjs.js',
      format: 'cjs',
      indent: false,
      sourcemap: false,
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
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

  // ES
  {
    input: './src/index.js',
    output: {
      file: 'es/styled-breakpoints.es.js',
      format: 'es',
      indent: false,
      sourcemap: false,
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
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

  // ES for Browsers
  {
    input: 'src/index.js',
    output: {
      file: 'es/styled-breakpoints.es.mjs',
      format: 'es',
      indent: false,
      sourcemap: false,
    },
    plugins: [
      configuredFlow,
      resolve({
        jsnext: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
      commonjs(),
      flowEntry(),
    ],
  },
];
