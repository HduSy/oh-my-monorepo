export const str = 'Hello Webpack'
// 无副作用

export const waitTime = async time => {
  await new Promise(rs => {
    setTimeout(() => {
      rs(true)
    }, time)
  })
}
