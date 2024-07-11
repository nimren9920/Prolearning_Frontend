import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading.js";
function Auth({ children, aut = true }) {
  const authstate = useSelector((store) => store.user.status);
  const authrole=useSelector((store) => store?.user?.data?.role);
  console.log("sttus", authstate);
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
 
  useEffect(() => {
    console.log("sttus of if cond", aut && authstate !== aut);
    if (aut && authstate !== aut) {
      navigate("/login");
    } else if (!aut && authstate !== aut) {
      navigate(`/${authrole}/dashboard`);
    }

    setloader(true);
  }, [authstate, navigate, aut]);

  return loader ? <>{children}</> : <Loading />;
}

export default Auth;