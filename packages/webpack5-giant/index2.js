export const aaa = 'aaa'
print('有副作用保留')
// console.log('有副作用保留')

function load() {
  import('./src/b')
}

load()
