const { merge } = require('webpack-merge')
const { resolveApp } = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js', // 清缓存，引入contenthash: 输出文件内容的 md4-hash（例如 [contenthash].js -> 4ea6ff1de66c537eb9b2.js）
    path: resolveApp('dist'),
    clean: true,
  },
})
