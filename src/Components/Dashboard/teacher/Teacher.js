import React ,{ useState } from 'react'
import Header from '../../Navbar/header.js'

const Teacher = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  return (
   <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
   <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
   "THis is Teacher page it will only acces by the Parnet"

   </div>
  )
}

export default Teacher


