// ts 类型工具
export type ValueOf<T> = T[keyof T]

export interface IUserInfo {
  userName: string
  userPass: string
  accessToken: string
}
