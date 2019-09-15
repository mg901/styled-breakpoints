import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import { main, dependencies, peerDependencies } from './package.json';

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
    plugins: [resolve(), commonjs(), uglify()],
  },
];
