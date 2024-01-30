const chalk = require('chalk')
const { appDirectory } = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isEnvProduction = process.env.NODE_ENV === 'production'

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isEnvProduction ? false : 'eval-cheap-module-source-map',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 绝对路径，磁盘存放路径
    pathinfo: false, // 去掉路径信息
    // 不引入contenthash:提升本地开发构建效率
    // 引入contenthash:清缓存，输出文件内容的 md4-hash（例如 [contenthash].js -> 4ea6ff1de66c537eb9b2.js）
    filename: isEnvProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    chunkFilename: 'async-[hash:8]-chunk.js', // 非入口模块chunk名
    // 编译前清除目录
    clean: true, // 就不需要clean-webpack-plugin插件了
  },
  // 配置 webpack 如何解析模块，可减小解析范围
  resolve: {
    alias: {
      '@': appDirectory, // 路径别名
    },
    extensions: ['.tsx', '.ts', '.js'], // 配置需解析的文件类型列表
    modules: [path.resolve(__dirname, 'node_modules'), appDirectory], // 缩小解析范围、提供精确定位都能提升构建速度
    symlinks: false, // 不需要软链的话
  },
  module: {
    rules: [
      // 处理图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset', // url-loader
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      // 处理字体
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource', // file-loader
      },
      {
        test: /\.css$/i,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader', // 仅生产环境
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
            },
          },
          'postcss-loader', // 处理 css ，添加浏览器前缀、转换浏览器兼容性 css 写法、css-modules 解决全局命名冲突问题
          {
            loader: 'thread-loader', // 耗时 loader 放入独立 worker 池运行
            options: {
              // the number of spawned workers, defaults to (number of cpus - 1) or
              // fallback to 1 when require('os').cpus() is undefined
              workers: 2,

              // number of jobs a worker processes in parallel
              // defaults to 20
              workerParallelJobs: 50,
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          },
        ],
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: appDirectory + '/src/index.html',
      // 压缩HTML
      minify: {
        removeComments: isEnvProduction,
        collapseWhitespace: isEnvProduction, // 删除空⽩符与换⾏符
        minifyCSS: isEnvProduction, // 压缩内联css
      },
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}
