import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const banner = `/*!
* CopyLockr v2.0.0
* (c) ${new Date().getFullYear()} Alexandro Fuentelsaz
* Released under the MIT License.
*/`;

export default {
  input: 'src/copylockr.js',
  output: [
    {
      file: 'dist/copylockr.js',
      format: 'umd',
      name: 'CopyLockr',
      banner: banner,
      sourcemap: true
    },
    {
      file: 'dist/copylockr.min.js',
      format: 'umd',
      name: 'CopyLockr',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs()
  ],
  external: []
};