const glob = require('glob')
const { merge } = require('webpack-merge')
const { resolveApp, appDirectory } = require('./paths')
const common = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin') // webpack5 自带，js 压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // css 压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取 js 文件中的 css
const PurgeCSSPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin // CSS Tree Shaking

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js', // 清缓存，引入contenthash: 输出文件内容的 md4-hash（例如 [contenthash].js -> 4ea6ff1de66c537eb9b2.js）
    path: resolveApp('dist'),
    clean: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].[name].css',
    }),
    // CSS Tree Shaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${appDirectory}/**/*`, { nodir: true }),
    }),
  ],
  optimization: {
    runtimeChunk: true, // 为运行时代码创建一个额外的 chunk，减少 entry chunk 体积
    moduleIds: 'deterministic', // hash 不随依赖改变而改变
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 第三方模块
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true,
        },
        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 0, // 公共模块的大小限制
          minChunks: 2, // 公共模块最少复用过几次
        },
      },
    },
  },
})
