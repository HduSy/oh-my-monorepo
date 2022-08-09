import splitString from './commands/splitString'
import { logger } from './log'

// 入口主文件
const { Command } = require('commander')

const fs = require('fs')
const pkgversion = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version

const CLI = new Command()
CLI.name('trek').description('A CLI to some JavaScript utilities').version(pkgversion)

CLI.command('split')
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

CLI.parse()
