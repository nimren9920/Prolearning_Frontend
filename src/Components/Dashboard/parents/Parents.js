import React ,{ useState } from 'react'
import Header from '../../Navbar/header.js'
import { Link } from 'react-router-dom'

const Parents = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  return (
   <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
   <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
 "THis is PArent page it will only acces by the Parnet"
 <Link to={"/create/topic"}><div>Create Topics</div></Link>
   </div>
  )
}

export default Parents


