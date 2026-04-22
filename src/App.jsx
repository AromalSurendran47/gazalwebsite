import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Agence from './pages/Agence'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Services from './pages/Services'
import ProjectDetail from './pages/ProjectDetail'
import Navbar from './components/Navigation/Navbar'
import FullScreenNav from './components/Navigation/FullScreenNav'
import SEO from './components/SEO/SEO'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <ScrollToTop />
      <SEO />
      <Navbar />
      <FullScreenNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/project/:id' element={<ProjectDetail />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App