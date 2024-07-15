import React ,{ useState } from 'react'
import Header from '../../Navbar/header.js'
import { Link } from 'react-router-dom'
import Home from"./Home.js"
const Teacher = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  return (
   <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
   <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
    <Home/>
   </div>
  )
}

export default Teacher


