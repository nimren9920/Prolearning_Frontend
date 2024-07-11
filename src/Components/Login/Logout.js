import React, { useEffect } from "react";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  //const status = useSelector((store) => store.user.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(()=>{
        axios.defaults.withCredentials=true;

        axios.post(`${process.env.REACT_APP_API_URL}/api/users/logout`).then(res=>{dispatch(logout());navigate('/home')}).catch(err=>console.log(err))
    },[dispatch,navigate])
  return (
    <Loading/>
  );
};

export default Logout;