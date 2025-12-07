import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Facilities from './pages/Facilities'
import Team from './pages/Team'
import RoomsPage from './pages/Rooms'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/facilities' element={<Facilities />} />
        <Route path='/teams' element={<Team />} />
        <Route path='/rooms' element={<RoomsPage />} />
      </Routes>
    </>
  )
}

export default App