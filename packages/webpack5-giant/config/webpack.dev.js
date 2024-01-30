const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const isNeedSpeed = true

const config = merge(common, {
  devServer: {
    static: path.resolve(__dirname, './dist'), // 静态文件目录
    port: 8888,
    client: {
      progress: true, // 浏览器显示编译进度
      overlay: true, // 浏览器全屏显示错误
    },
    open: false,
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
