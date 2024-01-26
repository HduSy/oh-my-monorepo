const path = require('path')
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'development',
  entry: {
    main: './index.js',
    other: './index2.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'), // 绝对路径，磁盘存放路径
    filename: '[name]-[chunkhash:8]-bundle.js',
    publicPath: './dist', // 资源访问路径
    chunkFilename: 'async-[hash:8]-chunk.js', // 非入口模块chunk名
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}

module.exports = config
