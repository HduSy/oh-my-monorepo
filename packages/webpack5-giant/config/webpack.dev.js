const { merge } = require('webpack-merge')
const { resolveApp } = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    // 文件名
    filename: '[name].bundle.js', // 不引入 contenthash 提升本地开发构建效率
    // 文件路径
    path: resolveApp('dist'),
    // 编译前清楚目录
    clean: true,
  },
})
