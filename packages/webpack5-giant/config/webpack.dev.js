const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { resolveApp } = require('./paths.js')
const common = require('./webpack.common')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const isNeedSpeed = true

const config = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    // 文件名
    filename: '[name].bundle.js', // 不引入 contenthash 提升本地开发构建效率
    // 文件路径
    path: resolveApp('dist'),
    // 编译前清除目录
    clean: true,
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8888,
    client: {
      progress: true, // 浏览器显示编译进度
      overlay: true, // 浏览器全屏显示错误
    },
    open: true,
    hot: true,
    compress: true, // 静态资源 gzip 压缩
    proxy: {
      '/api': 'http://localhost:3000', // /api/xx -> http://localhost:3000/api/xx
      '/api2': {
        target: 'http://localhost:3000', // /api2/xx -> http://localhost:3000/xx
        pathRewrite: {
          '/api2': '',
        },
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

module.exports = isNeedSpeed ? smp.wrap(config) : config
