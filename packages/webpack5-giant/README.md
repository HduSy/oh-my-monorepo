# Webpack
## 🚨 罪魁祸首
`webpack`的`resolve.symlinks`配置成了`true`
## 背景
`babel-loader`处理`/\.[jt]s/i`相关文件时的处理，要么报错，要么输出结果不符合预期
### 包管理工具
`pnpm`执行打包过程报错，切换`yarn`后成功运行打包
### `babel`相关依赖
`@babel/preset-env`: 语法转换 + `polyfill`，但是会污染全局环境、每个文件都重复声明`helper`函数;
`@babel/plugin-transform-runtime` + `@babel/runtime-corejs3`: 转为引用`runtime`中的`helper`;
### `babel`相关配置
`.babelrc`
```js
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"],
  "plugins": [ ["@babel/plugin-transform-runtime", {
    "helpers": true,
    "corejs": 3,
    "useESModules": true,
    "absoluteRuntime": false
  }] ],
}
```
输出：
```js
var _babel_runtime_corejs3_core_js_stable_instance_flat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/@babel/runtime-corejs3/core-js-stable/instance/flat.js\")
```
### `package.json`
```json
"devDependencies": {
    "@babel/core": "^7.23.9",
    "@babel/plugin-transform-runtime": "^7.23.9",
    "@babel/preset-env": "^7.23.9",
    "@babel/preset-typescript": "^7.23.3",
    "babel-loader": "^9.1.3",
    // ...
},
"dependencies": {
    "@babel/runtime-corejs3": "^7.23.9",
    "core-js": "^3.35.1"
}
```
## 参考来源
[webpack入门之js处理(babel、babel polyfill)](https://juejin.cn/post/7126465727178997791)
[webpack入门之css处理(css预处理器和css后置处理器)](https://juejin.cn/post/7125605683633848356)
[webpack入门之图片、字体、文本、数据文件处理](https://juejin.cn/post/7126012733018865695)
[webpack入门之js处理(babel、babel polyfill)](https://juejin.cn/post/7126465727178997791)
[webpack入门之ts处理(ts-loadr和babel-loader的选择)](https://juejin.cn/post/7127206384797483044)
[webpack入门之开发环境(mode、dev-server、devtool)](https://juejin.cn/post/7127576450378842119)
[webpack入门之提升开发效率的几个配置(ProvidePlugin、DefinePlugin、resolve、externals)](https://juejin.cn/post/7241424021128364087)
