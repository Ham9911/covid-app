import React,{useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import EmpHome from '../../employee/EmpHome'
import LoggedinRoutes from '../../routes/LoggedinRoutes'
import Routes from '../../routes/Routes'
import UserRoutes from '../../routes/UserRoutes'

const AuthHandler = () => {
    const authCtx = useContext(AuthContext)
    console.log(authCtx.isLoggedIn,authCtx.isUser)
    if (authCtx.isLoggedIn && authCtx.isUser){return <UserRoutes/>}
    else if (authCtx.isLoggedIn){return <LoggedinRoutes />}
    else{return <Routes />}

}
export default AuthHandler
