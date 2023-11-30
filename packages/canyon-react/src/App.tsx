import { lazy, Suspense, useEffect } from 'react'
import { Provider } from 'react-redux' // Provider使得store对React组件可用
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.scss'
import Loading from './pages/Loading'
import store from './store'
const renderLoader = () => <Loading />
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Counter = lazy(() => import('./pages/Counter'))

const AppRoutes = () => {
  const location = useLocation()
  useEffect(() => {
    console.log(`location change: ${location.pathname}`)
  }, [location])
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/count' element={<Counter />}></Route>
    </Routes>
  )
}
const AppContent = () => {
  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Suspense fallback={renderLoader()}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </div>
  )
}
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
