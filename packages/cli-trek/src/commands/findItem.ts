export default function findItem(arr: any[], target: any) {
  const result = arr.find(item => item === target)
  if (result) return result
  else return '未找到'
}
