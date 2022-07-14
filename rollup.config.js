// import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import clear from 'rollup-plugin-clear'
// import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild'

// TODO: change [filename] to your app name
// const useBabelPlugin = function(options = {}, minified) {
//   return getBabelOutputPlugin({
//     presets: [['@babel/preset-env', options]],
//     filename: 'temp',
//     minified
//   })
// }

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
        // plugins: [useBabelPlugin()]
      }
    ],
    plugins: [
      clear({
        targets: ['./dist']
      }),
      nodeResolve(),
      commonjs({  // rollup-plugin-node-resolve 插件可以解决 ES6模块的查找导入，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理
        include: 'node_modules/**', // 包括
        exclude: [],  // 排除
      }),
      esbuildPlugin
    ]
  },
  // {
  //   input: './src/index.ts',
  //   output: [{ file: 'types/index.d.ts', format: 'es' }],
  //   plugins: [dts()]
  // }
]
