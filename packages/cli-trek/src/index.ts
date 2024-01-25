// 入口主文件
import { Command } from 'commander'
import process from 'process'
import addUserInfo from './commands/addUserInfo'
import findItem from './commands/findItem'
import splitString from './commands/splitString'
import { setEnv } from './config'
import { logger } from './log'

const program = new Command()
const fs = require('fs')
const pkgversion = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version

// const CLI = new Command()
program.name('trek').description('A CLI to some JavaScript utilities').version(pkgversion)

program
  .command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('-s, --separator <char>', 'separator character', ',')
  .option('-n, --num <num>', 'display num of substring', undefined)
  .option('--first', 'display just the first substring')
  .action((str: string, opts: any) => {
    if (!str) {
      logger.warn('目标字符串不可为空')
      process.exit(-1)
    }
    const result = splitString(str, opts.separator, opts.num)
    console.log(result)
  })

program
  .command('adduser')
  .description('添加用户信息')
  .option('-e, --env <env>', '选择特定环境, 如dev, uat, pre 或 prod', 'prod')
  .action(options => {
    if (options.env) {
      setEnv(options.env)
    }
    addUserInfo()
  })
program
  .command('find')
  .description('查找数组内指定元素')
  .argument('<target>', '待查找元素')
  .argument('<arr...>', '目标数组')
  .action((target: any, arr: any[]) => {
    if (arr.length === 0) {
      logger.warn('目标数组不可为空')
      process.exit(-1)
    }
    if (!target) {
      logger.warn('待查找元素不可为空')
      process.exit(-1)
    }
    const result = findItem(arr, target)
    console.log(result)
  })

program.parse()
