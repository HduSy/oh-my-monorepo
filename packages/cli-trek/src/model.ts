import { getConfig } from './config'
import { users } from './db'
import { logger, spinner } from './log'

function handleError(e: any) {
  const res = e.response
  if (res) {
    spinner.fail('接口请求错误')
    if (res.status === 401) {
      logger.warn('鉴权失败', e.message)
    } else if (res.status === 404) {
      logger.warn('页面不存在', e.message)
    } else {
      logger.warn('请求失败，错误：', res.status, res.statusText)
    }
  } else {
    logger.warn('程序错误', e.message)
  }
}

// 接口请求方法
export async function checkUserAuth(username: string, password: string): Promise<boolean> {
  const { API_HOST } = getConfig()
  try {
    // 鉴权请求
    console.log(API_HOST)
    return await new Promise(resolve => {
      setTimeout(() => {
        if (users.find(item => item.username === username && item.password === password))
          resolve(true)
        else resolve(false)
      }, 1200)
    })
  } catch (error) {
    handleError(error)
    return false
  }
}
