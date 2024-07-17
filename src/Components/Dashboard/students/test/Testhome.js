import React,{useState} from 'react'
import Header from '../../../Navbar/header'
const Testhome = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false)
    return (
     <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
     <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
     Test
     </div>
  )
}

export default Testhome