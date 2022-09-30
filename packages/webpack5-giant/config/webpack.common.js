const chalk = require('chalk')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { resolveApp, appDirectory } = require('./paths')

const ctx = {
  isEnvDevelopment: process.env.NODE_ENV === 'development',
  isEnvProduction: process.env.NODE_ENV === 'production',
}

const { isEnvDevelopment, isEnvProduction } = ctx

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    pathinfo: false, // 去掉路径信息
    filename: ctx.isEnvProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
  },
  // 配置 webpack 如何解析模块，可减小解析范围
  resolve: {
    alias: {
      '@': appDirectory, // 路径别名
    },
    extensions: ['.tsx', '.ts', '.js'], // 配置需解析的文件类型列表
    modules: ['node_modules', appDirectory], // 缩小解析范围，提升构建速度
    symlinks: false, // 不需要软链的话
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [resolveApp('src')], // 减小 loader 应用范围
        type: 'asset/resource', // webpack5 - Assetmodules
      },
      {
        test: /\.s[ac]ss$/i,
        include: appDirectory,
        use: [
          'style-loader',
          isEnvProduction && MiniCssExtractPlugin.loader, // 仅生产环境
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader', // 处理 css ，添加浏览器前缀、转换浏览器兼容性 css 写法、css-modules 解决全局命名冲突问题
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          {
            loader: 'thread-loader', // 耗时 loader 放入独立 worker 池运行
            options: {
              workerParallelJobs: 2,
            },
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ].filter(Boolean),
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: appDirectory,
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
    ],
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: appDirectory + '/src/index.html',
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}
