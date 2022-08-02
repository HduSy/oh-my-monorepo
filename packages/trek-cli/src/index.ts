// 入口主文件
const { Command } = require('commander')

const fs = require('fs')
const pkgversion = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version

const CLI = new Command()
CLI.name('trek').description('A CLI to some JavaScript utilities').version(pkgversion)

CLI.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-n, --num <num>', 'display num of substring', undefined)
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str: string, options: any) => {
    const limit = options.first ? 1 : options.num ? options.num : undefined
    console.log(str.split(options.separator, limit))
  })

CLI.parse()
