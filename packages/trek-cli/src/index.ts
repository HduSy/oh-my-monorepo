// 入口主文件
import { Command } from 'commander'
import addUserInfo from './commands/addUserInfo'
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

program.parse()
