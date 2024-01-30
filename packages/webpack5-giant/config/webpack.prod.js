const glob = require('glob')
const { merge } = require('webpack-merge')
const { appDirectory } = require('./paths')
const common = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin') // webpack5 自带，js 压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 压缩 CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取 js 文件中的 css
const path = require('path')
const PurgeCSSPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin // CSS Tree Shaking
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].[name].css',
    }),
    // CSS Tree Shaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${appDirectory}/**/*`, { nodir: true }),
    }),
    // gzip 压缩
    new CompressionPlugin(),
  ],
  optimization: {
    minimize: true,
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
      chunks: 'all', // 优化范围
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
