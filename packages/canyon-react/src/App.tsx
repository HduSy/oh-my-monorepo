import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Loading from './pages/Loading'
const renderLoader = () => <Loading />
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Suspense fallback={renderLoader()}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
