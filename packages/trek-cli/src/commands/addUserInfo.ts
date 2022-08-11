import * as inquirer from 'inquirer'
import { spinner } from '../log'

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
  console.log(userName, userPass, accessToken)
  spinner.success('用户名、密码输入正确')
}
