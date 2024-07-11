import React, { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";

import {  useParams } from "react-router-dom";
import FormikRichText from "./index"
import axios from "axios";
const Editor =()=>{
   const [data,setdata]=useState("")
   const title=useRef("")
   const [err,seterr]=useState()
  //  console.log(data)
  const {id}=useParams()
  function newpost(){
    //console.log(data,title.current.value)
    if(data && title?.current?.value){
      const body={
        'name':title?.current?.value,
        'description':data,
        'chapterId':id,
      }
      console.log(body);
      axios.defaults.withCredentials=true;
      axios.post(`${process.env.REACT_APP_API_URL}/api/topics/`,body).then(res=>seterr('New Topic Created Succesfully')).catch(err=>seterr('Some Error Caught while Creating new Topic'))
     
    }
    else{
      console.log('data require to post');
      seterr('All Field Required')
      setTimeout(() => {
        seterr()
      }, 2000);
      return
      
    }
  }
    return <>
    
    <div className="  min-h-screen mx-auto p-4">
          <div className="md:w-1/2 mx-auto">
     <div className="flex justify-center "><div className="mb-1">
            <label    className="py-2 block text-lg font-medium text-Black">
              Topic Title:
            </label>
            <input
              id="title"
              type="text"
               className="mt-1 p-2 w-[100vh] border rounded-md bg-slate-100"
              ref={title}
            />
          </div></div>
   
          <div className="flex justify-center px-4">   <FormikRichText  value={data} setValue={setdata} /></div>

         
 <div className="px-4">     {err &&<p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg  bg-gray-100 dark:text-red-400"
              role="alert"
            >
              {err}
            </p>}      <button className="bg-gray-800 hover:bg-blue-900  text-white py-2 px-4 rounded-md" onClick={newpost}>Add New Topic</button>
 </div>
 </div>
 </div>
  </>
  
}

export default Editor;