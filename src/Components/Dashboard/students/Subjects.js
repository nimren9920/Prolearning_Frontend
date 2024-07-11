import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Subjects = () => {
  const [data,setdata]=useState()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/subjects/standard/10`).then(res=>{setdata(res.data.data.standards[0]);console.log(data.data.standards);}).catch(err=>console.log(err))
  },[])
  return (
    <>
   <div className="flex flex-col gap-2 p-2 sm:flex-row">
  <div className="flex flex-col items-center justify-center sm:w-[10%]">
   <Link to={`/subject/${data?.subjects[0]?._id}`}> 
   
   <img src="https://t4.ftcdn.net/jpg/05/51/43/61/240_F_551436197_pNDNeD5zSx2Sdm4LAHrRPyjSAHsv3M3V.jpg" className=""/>

<div className='flex justify-center items-center'>   {data && <h3>{data?.subjects[0]?.name}</h3>}</div></Link>
  </div>

</div>

    </>
  )
}

export default Subjects