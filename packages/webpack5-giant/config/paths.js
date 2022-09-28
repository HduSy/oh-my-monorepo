const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd()) // realpath 同步版本，返回绝对路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  resolveApp,
}
