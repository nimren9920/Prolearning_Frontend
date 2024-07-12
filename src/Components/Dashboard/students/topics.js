import React, { useEffect,useState } from 'react'
import Header from '../../Navbar/header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Loading from '../../Loading/Loading'
const Topics = () => {
  const {id}=useParams()
  const navigate=useNavigate()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  const [data,setdata]=useState()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/chapters/${id}`).then(res=>{setdata(res.data.data);console.log(res.data.data);}).catch(err=>console.log(err))
  },[])
  return (
    <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
   <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
    {/* <div>List of Topics</div>
    {data && data.topics.map((items)=>{
      return (<div><Link to={`/topic/${items._id}`}>{items.name}</Link></div>)
    })} */}
    <div class="m-2 font-semibold text-xl flex flex-row ">
  <button className='px-2' onClick={()=>{navigate(-1)}}><IoIosArrowBack color='red' />
  </button>
 
  <p>List of Topics:</p>
  </div>

  
  {data ? (<>  <div class="grid sm:grid-cols-2 md:grid-cols-3 pt-2 m-2 border border-gray-400 rounded-lg shadow-2xl">
     {data && data.topics.map((items)=>{
      return (  
    <Link to={`/topic/${items._id}`}>  <div class="border-r border-black border-spacing-y-4">
    <div class="flex justify-between p-4 m-2 border-solid border-gray-500 border-b">
     <h1 class="font-semibold">{items.name}</h1>
     <h1 class="text-orange-600 pl-2"><IoIosArrowForward/></h1>
 </div>
 </div></Link>
      )
    })}

</div></>):<Loading/>}

</div>
    
  )
}

export default Topics