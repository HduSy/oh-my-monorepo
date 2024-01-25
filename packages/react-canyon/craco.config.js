const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

const webpack = require('webpack')

const { name } = require('./package.json')

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

// const CracoAntDesignPlugin = require("craco-antd");

// const CracoLessPlugin = require('craco-less');

/* craco.config.js */

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,

        // 接入微前端框架qiankun的配置,不接入微前端可以不需要

        library: `${name}-[name]`,

        libraryTarget: 'umd',

        globalObject: 'window',
      }

      webpackConfig.resolve = {
        ...webpackConfig.resolve,

        extensions: ['.ts', '.tsx', '.scss', '.js'],

        fallback: {
          ...webpackConfig.resolve?.fallback,

          path: false,
        },
      }

      return webpackConfig
    },

    alias: {
      '@': pathResolve('src'),

      '@assets': pathResolve('src/assets'),

      '@components': pathResolve('src/components'),

      '@pages': pathResolve('src/pages'),

      '@store': pathResolve('src/store'),

      '@types': pathResolve('src/types'),

      '@utils': pathResolve('src/utils'),
    },

    plugins: [
      new MonacoWebpackPlugin(),

      new webpack.DefinePlugin({
        __DEBUG__: true,
      }),
    ],
  },

  devServer: {
    proxy: {
      '/x': {
        target: 'http://localhost:3000',
      },
    },

    open: false,
  },
}
