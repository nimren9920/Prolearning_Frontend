import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  // const id=useRef()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [err, setErr] = useState();
  const [isLogging, setloggin] = useState(false);

  function log() {
    setErr();
    setloggin(true);
    const body = {
      email: email.current.value,
      // "username": email.current.value,
      password: password.current.value,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/login`, body, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(login(res.data.data.loggedInUser));
        
        navigate(`/${res?.data?.data?.loggedInUser?.role}/dashboard`);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setErr("User Does not Exist");
        } else if (err.response.status === 401) {
          setErr("Wrong Password");
        } else {
          setErr("Some Other Error");
        }
        setloggin(false);
        // setTimeout(() => {
        //   setErr()
        // }, 2000);
      });
  }
  return (
    <>
      <div className="bg-blue-400 h-screen w-screen">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div
            className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
            style={{ height: "500px" }}
          >
            <div
              className="hidden md:block md:w-1/2 rounded-r-lg"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-vector/kids-studying-from-home-concept-illustration_114360-1762.jpg?t=st=1719916369~exp=1719919969~hmac=894a8f71cdea6ebe22bb1282973ceffdc18722eb82717b55f3a0c41fbcc28d56&w=740')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            ></div>
            <div className="flex flex-col w-full md:w-1/2 p-4">
              <div className="flex flex-col flex-1 justify-center mb-">
                <h1 className="text-4xl text-center font-light">Login</h1>
                <div className="w-full mt-4">
                  <form
                    className="form-horizontal w-3/4 mx-auto"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="flex flex-col mt-4">
                      <input
                        id="email"
                        ref={email}
                        type="email"
                        className="flex-grow h-8 px-2 border rounded border-grey-400"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <input
                        id="password"
                        ref={password}
                        type="password"
                        className="flex-grow h-8 px-2 rounded border border-grey-400"
                        name="password"
                        required
                        placeholder="Password"
                      />
                    </div>
                    {/* <div className="flex items-center mt-4">
                                <input type="checkbox" name="remember" id="remember" className="mr-2"> <label for="remember" className="text-sm text-grey-dark"/>Remember Me</label>
                            </div> */}
                    <div className="flex flex-col mt-8 ">
                      <button
                        onClick={log}
                        className="cursor-pointer flex w-full justify-center items-center rounded-md bg-blue-500 hover:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {isLogging ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </div>
                    {err && (
                      <div className=" flex flex-col mt-4">
                        {" "}
                        <p className="py-2 px-4 bg-gray-200 text-red-500">
                          {err}
                        </p>
                      </div>
                    )}
                  </form>

                  <div className="text-center mt-4">
                    New to Prolearning ?{" "}
                    <Link
                      className="no-underline hover:underline text-blue-dark text-sm text-blue-500"
                      to={"/signup"}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 

<form onClick={e=>e.preventDefault()}>
  <input ref={email} type='text'  placeholder='Email id'/>
  <input ref={password} type='text' placeholder='password'/>
  <button onClick={log}>login</button>
  <p>New to Prolearning ?<Link to={'/Signup'}>Sign Up</Link></p>
</form>


<div class="pt-10 flex justify-between items-center">
 <div>
 
   <div class="flex justify-center text-xl font-bold"><h1>Login</h1></div>
   
  <form class="m-2 flex flex-col px-2">
  <label > Email ID: <input class="m-4 p-1 border rounded-xl border-solid border-black" placeholder="Enter your email " /></label>
  <label > Password: <input class="m-2 p-1 border rounded-xl border-solid border-black" placeholder="Enter Password" /></label>
<br/>
 
  <button class="flex justify-center w-20 ml-28 mt-4 bg-grey border rounded-xl border-solid border-black p-1">Login</button>
</form>
 </div>
</div> */}
    </>
  );
};

export default Login;
