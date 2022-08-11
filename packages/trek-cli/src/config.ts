import * as chalk from 'chalk'
import * as jsonfile from 'jsonfile'
import * as os from 'os'
import { logger, paramError } from './log'
import { IUserInfo, ValueOf } from './types'

// 全局配置
const config = {
  dev: {
    API_HOST: 'http://localhost:3200/st/cli',
  },
  uat: {
    API_HOST: 'http://uat-xxx.co/st/cli',
  },
  pre: {
    API_HOST: 'http://pre-xxx.co/st/cli',
  },
  prod: {
    API_HOST: 'http://xxx.co/st/cli',
  },
}

let env: keyof typeof config = 'prod'
export function setEnv(e: keyof typeof config): void {
  if (config[e]) {
    env = e
  } else {
    paramError('env', '只能是dev,uat,pre或prod')
    process.exit(-1)
  }
}

export function getEnv(): string {
  return env
}

export function getConfig(e?: keyof typeof config): ValueOf<typeof config> {
  return config[e || env]
}

const userInfoFilePath = `${os.homedir()}/.user_info_file`
/**
 *
 * @param userInfo 写入用户信息
 */
export function writeUserInfo(userInfo: IUserInfo): void {
  jsonfile.writeFileSync(userInfoFilePath, userInfo, { spaces: 2 })
}
/**
 * 获取用户信息
 */
export function readUserInfo(): IUserInfo {
  const config = jsonfile.readFileSync(userInfoFilePath) as IUserInfo
  if (config) {
    if (config.userName && config.userPass) {
      return config
    } else {
      logger.error(`用户信息已失效，须重新运行 ${chalk.blue('trek adduser')} 配置`)
      process.exit(-1)
    }
  } else {
    logger.error(`无法获取用户信息，请运行 ${chalk.blue('trek adduser')} 添加用户信息`)
    process.exit(-1)
  }
}
