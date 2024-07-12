import React, { useEffect,useState } from 'react'
import Header from '../../Navbar/header'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Particulartopics = () => {
  const {id}=useParams()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  const [data,setdata]=useState()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/topics/${id}`).then(res=>{setdata(res.data.data);console.log(res.data.data);}).catch(err=>console.log(err))
  },[])
  return (
    <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
   <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
    <div>Title: {data?.name}</div>
    <div>{data?.description}</div>
    </div>  )
}

export default Particulartopics