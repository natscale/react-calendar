import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';

import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      del({ targets: 'dist/*', runOnce: true }),
      postcss({
        extract: true,
        minimize: true,
        extract: 'main.css',
      }),
      typescript({
        typescript: require('typescript'),
      }),
      del({ targets: ['docs/src/dist'], runOnce: true, hook: 'buildEnd' }),
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        plugins: [terser({ compress: true, mangle: true, format: { comments: false } })],
      },
      {
        file: pkg.module,
        format: 'esm',
        plugins: [terser({ compress: true, mangle: true, format: { comments: false } })],
      },
      {
        file: 'docs/src/latest/main.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
    ],
  },
];
