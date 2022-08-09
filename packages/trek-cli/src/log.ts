// 命令行个性化打印
import * as chalk from 'chalk'
import ora, { Ora } from 'ora'

export const paramError = (fieldName: string, ...msgs: string[]) => {
  console.log(`${chalk.bgYellowBright('参数格式错误')} 字段<${fieldName}>`, ...msgs)
}

export const logger = {
  info(msg: string): void {
    console.log(`${chalk.white.bold('[INFO]')} ${msg}`)
  },
  warn(...msgs: Array<string | never>): void {
    console.log.apply(null, [`${chalk.yellow.bold('[WARN]')}`, ...msgs])
  },
  success(msg: string): void {
    console.log(`${chalk.green.bold('[SUCCESS]')} ${msg}`)
  },
  error(msg: string | Error): void {
    console.log(`${chalk.red.bold('[ERROR]')}`, msg)
  },
}

let spinnerInstance: Ora | null
export const spinner = {
  start(text: string): void {
    // Start the spinner. Returns the instance. Set the current text if text is provided.
    spinnerInstance = ora(text).start()
  },
  info(text: string): void {
    // ℹ
    if (!spinnerInstance) spinnerInstance = ora('').start()
    spinnerInstance.info(text)
    spinnerInstance = null
  },
  warn(text: string): void {
    // ⚠
    if (!spinnerInstance) spinnerInstance = ora('').start()
    spinnerInstance.warn(text)
    spinnerInstance = null
  },
  success(text: string): void {
    // ✔
    if (!spinnerInstance) {
      spinnerInstance = ora('').start()
    }
    spinnerInstance.succeed(text)
    spinnerInstance = null
  },
  fail(text: string): void {
    // ✖
    if (!spinnerInstance) {
      spinnerInstance = ora('').start()
    }
    spinnerInstance.fail(text)
    spinnerInstance = null
  },
  stop() {
    // Stop and clear the spinner. Returns the instance.
    spinnerInstance && spinnerInstance.stop()
    spinnerInstance = null
  },
}
