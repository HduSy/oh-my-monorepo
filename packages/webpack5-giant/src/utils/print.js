export default function print(str) {
  const arrFlat = [4, 5, 6, [7]].flat(1)
  console.log(arrFlat, 'arrFlat2')
  console.log(str)
}
