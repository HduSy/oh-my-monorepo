const print = str => {
  console.log(str)
}

export const a = new Promise(rs => {
  setTimeout(() => rs(true), 1000)
})

console.log('console有副作用')

export { print }
