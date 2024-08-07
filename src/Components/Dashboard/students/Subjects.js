import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading'
const Subjects = () => {
  const [data,setdata]=useState()
  const imageMapping = {
    math: "https://t4.ftcdn.net/jpg/05/51/43/61/240_F_551436197_pNDNeD5zSx2Sdm4LAHrRPyjSAHsv3M3V.jpg",
    science: "https://us.123rf.com/450wm/captainvector/captainvector2208/captainvector220805169/189725517-science-subject-icon.jpg?ver=6",
    // Add more subject-image mappings here
  };
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/subjects/standard/10`).then(res=>{setdata(res.data.data.standards[0]);}).catch(err=>console.log(err))
  },[])
  return (
    <>
  {data ? ( <>
                        <div className="flex flex-col gap-2 p-2 m-2 sm:flex-row" >

            {console.log(data.subjects)}
          {data.subjects.map((datas,index)=>{
            return (
              <div className="flex flex-col items-center justify-center sm:w-[10%]" key={index}>
                <Link to={`/subject/${datas?._id}`}>
                  <img
                                         src={imageMapping[datas?.name.toLowerCase()] || "https://t4.ftcdn.net/jpg/05/51/43/61/240_F_551436197_pNDNeD5zSx2Sdm4LAHrRPyjSAHsv3M3V.jpg"}

                    alt="subject"
                    className=""
                  />

                  <div className="flex justify-center items-center">
                  
                    {data && <h3>{datas?.name}</h3>}
                  </div>
                </Link>
              </div>
            )
          })}
                      </div>

          </>):<Loading/>}

    </>
  )
}

export default Subjects