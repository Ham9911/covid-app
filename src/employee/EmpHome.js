import React, { useContext,useEffect,useState } from "react";
import {Button } from "antd";
import {
  auth,
  signOut,onAuthStateChanged
} from "../firebaseApp/FirebaseApp";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EmpHome = () => {
  let navigate=useNavigate();
  let [email,setEmail]=useState();
  const authCtx = useContext(AuthContext);
 //Checking User
 
 useEffect(() => {
   onAuthStateChanged(auth, (user) => {
     if (user) {
      setEmail(user.email);
       console.log(email);
     } else {
       // User is signed out
       // ...
       console.log("no user has logged in");
     }
   });
 }, []);

const onsurveyHandler =()=>{
  navigate('/survey');
}
  const logout = () => {
    console.log("function Runned");
    signOut(auth)
      .then(() => {
        authCtx.checkUserFalse();
        authCtx.onLogout();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="left-section">
      <h1>Welcome {email} </h1>
      <p>To take Survey <Button onClick={onsurveyHandler}>ClickHere</Button></p>
      </div>
      <div className="right-section">
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default EmpHome;
