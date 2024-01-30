const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin
const path = require('path')
const glob = require('glob')
const { appDirectory } = require('./config/paths')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    pathinfo: false, // 去掉路径信息
    filename: '[name].bundle.js',
    chunkFilename: 'async-[hash:8]-chunk.js', // 非入口模块chunk名
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      // v4/v5
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 4 * 1024,
      //       name: '[name]-[hash:4].[ext]',
      //       esModule: false,
      //       outputPath: 'images/', // Specify where the target file(s) will be placed
      //     },
      //   },
      //   type: 'javascript/auto',
      // },
      // v5
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.[jt]s$/i,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // typescript + babel-loader + @babel/preset-typescript > typescript + ts-loader
      // {
      //   test: /\.ts$/i,
      //   use: 'ts-loader',
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true, // 压缩内联css
      },
    }),
    // CSS Tree Shaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${appDirectory}/**/*`, { nodir: true }),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new MiniCssExtractPlugin(),
      new TerserPlugin({
        parallel: true,
      }),
    ],
    concatenateModules: true, // 开启 Scope Hoisting 功能
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
  },
}
