import React ,{useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { login} from '../../utils/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export const Signup = () => {
    const email=useRef()
    const password=useRef()
    const fullname=useRef()
    const phoneno=useRef()
    const role=useRef()
    const username=useRef()
    const [err,setErr]=useState()
    const [isLogging,setloggin]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    // Validation function
    function sign(){
        setloggin(true)
        if (!fullname.current.value || !email.current.value || !username.current.value || !password.current.value || !phoneno.current.value || !role.current.value || role.current.value==="ROLE") {
            setErr('All fields are Required');
            setTimeout(()=>{
                setErr()
            },2000)
            return;
        }
        const body={
            "fullName":fullname?.current?.value,
            "email": email?.current?.value,
   "username": username?.current?.value,
  "password": password?.current?.value,
  "phoneno":phoneno?.current?.value,
  "role":role?.current?.value,

        }

       axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`,body,{
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    }).then(res=>{console.log("Succesfully created new Account");dispatch(login(res.data.data.user));navigate("/profile")}).catch(err=>{console.log("Issue while creating the new account");setloggin(false)})
    console.log(body);
    }

  return (
<>


<div className="bg-blue-400 h-screen w-screen">
    <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0" style={{height: '500px'}}>
           
        <div className="hidden md:block md:w-1/2 rounded-r-lg" style={{backgroundImage: "url('https://img.freepik.com/free-vector/kids-studying-from-home-concept-illustration_114360-1762.jpg?t=st=1719916369~exp=1719919969~hmac=894a8f71cdea6ebe22bb1282973ceffdc18722eb82717b55f3a0c41fbcc28d56&w=740')", backgroundSize: 'cover', backgroundPosition: 'center center'}}></div>
        <div className="flex flex-col w-full md:w-1/2 p-4">
                <div className="flex flex-col flex-1 justify-center mb-">
                    <h1 className="text-4xl text-center font-light">Sign Up</h1>
                    <div className="w-full mt-2">
                        <form className="form-horizontal w-3/4 mx-auto" onClick={e=>e.preventDefault()}>
                            <div className="flex flex-col mt-4">
                                <input id="fullname" ref={fullname} type="text" className="flex-grow h-8 px-2 border rounded border-grey-400" name="text"  placeholder="fullname"/>
                            </div>
                            <div className="flex flex-col mt-4">
                                <input id="password" ref={username} type="text" className="flex-grow h-8 px-2 rounded border border-grey-400" name="username"  placeholder="username"/>
                            </div>
                            <div className="flex flex-col mt-4">
                                <input id="email" ref={email} type="text" className="flex-grow h-8 px-2 border rounded border-grey-400" name="email" placeholder="Email"/>
                            </div>
                            <div className="flex flex-col mt-4">
                                <input id="password" ref={phoneno} type="Number" className="flex-grow h-8 px-2 rounded border border-grey-400" name="phoneno"  placeholder="phoneno"/>
                            </div>
                            <div className="flex flex-col mt-4">
    <select ref={role} className="flex-grow h-8 px-2 rounded border border-grey-400 text-gray-500">
        <option className='' value={"ROLE"}>Role</option>
        <option value="STUDENT">Student</option>
        <option value="PARENT">Parent</option>
    </select>
</div>
                          
                           
                            <div className="flex flex-col mt-3">
                                <input id="password" ref={password} type="password" className="flex-grow h-8 px-2 rounded border border-grey-400" name="password"  placeholder="Password"/>
                            </div>
                            {/* <div className="flex items-center mt-4">
                                <input type="checkbox" name="remember" id="remember" className="mr-2"> <label for="remember" className="text-sm text-grey-dark"/>Remember Me</label>
                            </div> */}
                           <div className="flex flex-col mt-4 ">
                                <button onClick={sign} className="cursor-pointer flex w-full justify-center items-center rounded-md bg-blue-500 hover:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                {isLogging ? 
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> :
         
              "Sign Up"}
                        </button>
                            </div>
                            {err &&  <div className=" flex flex-col mt-4"> <p className='py-2 px-4 bg-gray-200 text-red-500'>{err}</p></div>}
                        </form>
                        
                        <div className="text-center mt-4">
                          Old to Prolearning ?  <Link className="no-underline hover:underline text-blue-dark text-sm text-blue-500" to={'/login'}>
                               Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</>
  )
}
