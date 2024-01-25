import * as inquirer from 'inquirer'
import { writeUserInfo } from '../config'
import { spinner } from '../log'
import { checkUserAuth } from '../model'

export default async function addUserInfo(): Promise<void> {
  const { userName, userPass, accessToken } = await inquirer.prompt([
    {
      type: 'input',
      name: 'userName',
      message: '填写用户名：',
      validate: (val: string) => {
        return val.length !== 0
      },
    },
    {
      type: 'input',
      name: 'userPass',
      message: '填写用户密码：',
      validate(val: string) {
        return val.length !== 0
      },
    },
    {
      type: 'input',
      name: 'accessToken',
      message: '填写准入 token：',
      validate(val: string) {
        return val.length !== 0
      },
    },
  ])
  spinner.start('开始验证用户名和用户密码是否正确...')
  const hasAuth = await checkUserAuth(userName, userPass)
  if (hasAuth) {
    spinner.success('用户名、密码输入正确')
  } else {
    spinner.fail('用户名或密码输入错误，请重试！')
    process.exit(-1)
  }
  if (accessToken) {
    spinner.start('检查 gitlab access token 正确性...')
  }
  spinner.start('写入用户信息...')
  writeUserInfo({ userName, userPass, accessToken })
  spinner.success('成功写入用户配置信息')
}
