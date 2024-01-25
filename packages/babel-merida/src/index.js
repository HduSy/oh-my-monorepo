// import '@babel/polyfill'
// syntax 层面
const fn = () => {
  console.log('hello babel')
}
// API 层面
const promiseFn = () =>
  new Promise((rs, rj) => {
    try {
      setTimeout(() => {
        rs(true)
      }, 1000)
    } catch (error) {
      rj(error)
    }
  })

const obj = new Proxy(
  {},
  {
    get(target, key) {
      console.log('拦截读操作')
      return target[key]
    },
    set(target, key, val) {
      console.log('拦截写操作')
      target[key] = val
      return true
    },
  },
)

const newObj = Object.assign({}, { name: 'babel' }, { description: 'transform js code' })

const find2 = [1, 2, 3, 4].find(item => item === 2)

async function getData() {
  const data = await promiseFn()
  return data
}

const flatArray = [1, [2, [3], 4]].flat(2) // chorjs@3支持

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  playBaseBall() {
    console.log('I like playing baseball.')
  }
}
