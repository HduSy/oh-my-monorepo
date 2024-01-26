const path = require('path')
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'development',
  devtool: false,
  entry: {
    index: './index.js',
    other: './other.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'), // 绝对路径，磁盘存放路径
    filename: '[name]-bundle.js',
    publicPath: './dist', // 资源访问路径
    chunkFilename: 'async-[hash:8]-chunk.js', // 非入口模块chunk名
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        // 此处配置
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: [
        //       [
        //         '@babel/preset-env',
        //         {
        //           targets: 'defaults',
        //           corejs: 3,
        //           useBuiltIns: 'usage',
        //         },
        //       ],
        //     ],
        //     cacheDirectory: true,
        //   },
        // },
        // 配置在单独配置文件，.babelrc .browserslistrc
        use: ['babel-loader'],
      },
    ],
  },
}

module.exports = config
