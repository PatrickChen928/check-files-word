import clear from 'rollup-plugin-clear'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild'


const esbuildPlugin = esbuild({
  sourceMap: true,
  include: ['node_modules', './src/**']
  // target: 'esnet'
})

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
      }
    ],
    plugins: [
      clear({
        targets: ['./dist']
      }),
      nodeResolve(),
      commonjs({
        include: 'node_modules/**', // 包括
        exclude: [],  // 排除
      }),
      esbuildPlugin
    ]
  },
  {
    input: './src/index.ts',
    output: [{ file: 'types/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]
