import React ,{ useState } from 'react'
import Header from '../../Navbar/header.js'
import Subjects from './Subjects.js'
const Student = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  return (
   <div className={`${isSideNavOpen? 'ml-64': ''}`} >
   <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
    <Subjects />
   </div>
  )
}

export default Student


