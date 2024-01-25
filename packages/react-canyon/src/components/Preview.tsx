import { FunctionComponent } from 'react'
// iframe src 指定为react-route-dom路由，是完全ok的
const Preview: FunctionComponent = () => {
  return <iframe src='/about'></iframe>
}
export default Preview
