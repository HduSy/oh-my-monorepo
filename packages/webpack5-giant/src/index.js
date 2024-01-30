import './css/test.css'
import './css/test.scss'

import { print, sleep } from './utils'

sleep(2 * 1000).then(() => {
  print('print')
})

import IMG from './assets/IMG_1487.jpg'

console.log(IMG, 'IMG')

window.addEventListener('load', () => {
  const imgElement = document.createElement('img')
  imgElement.src = IMG
  document.body.appendChild(imgElement)
  imgElement.addEventListener('click', () => import(/* webpackPrefetch: true */ './a'))
})

const arrFlat = [1, 2, 3, [4]].flat(1)
console.log(arrFlat, 'arrFlat')
