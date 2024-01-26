export const aaa = 'aaa'
import { print } from './src/b.js'
print('other.js')
// console.log('other.js')

function load() {
  import('./src/b')
}

load()

const flatArr = [1, [2], 3, 4].flat(2)
console.log(flatArr)
