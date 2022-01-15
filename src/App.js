import './App.css';
import 'antd/dist/antd.css';
import LoggedinRoutes from './routes/LoggedinRoutes'
import AuthContext from "./context/AuthContext"
import Routes from './routes/Routes'
import {useState} from 'react';
import AuthHandler from './components/authHandler/AuthHandler';
import EmpHome from './employee/EmpHome';
import Survey from './employee/Survey';
function App() {
 const [isAuth,setisAuth]=useState(false);
 const [isuser,setisUser]=useState(false);
 const onLogin=()=>{
   setisAuth(true);
 }
 const onLogout=()=>{
  setisAuth(false);
}
const checkUser=()=>{
  console.log("functionRunned")
  setisUser(true);
}

const checkUserFalse=()=>{
  setisUser(false);
}
  
  return (
    
    <div className="App">
      <AuthContext.Provider value={{isLoggedIn:isAuth,isUser:isuser,checkUser,checkUserFalse,onLogin,onLogout}}>
        <AuthHandler />
      
        </AuthContext.Provider>
    </div>
   
  );
}

export default App;
