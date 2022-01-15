import React, { useContext } from "react";
import {Button } from "antd";
import {
  auth,
  signOut,
} from "../firebaseApp/FirebaseApp";
import AuthContext from "../context/AuthContext";
const EmpHome = () => {
  const authCtx = useContext(AuthContext);



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
  
      </div>
      <div className="right-section">
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default EmpHome;
