import React from 'react'
import { Routes as AppRoutes, Route, Link } from "react-router-dom";
import NavBeforeLogin from '../components/Nav/NavBeforeLogin';
import SignIn from '../SignIn/SignIn';
import Signup from '../signup/Signup';
const Routes = () => {
    return (
        <div>
        <NavBeforeLogin/>
        <AppRoutes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<Signup/>} />
       </AppRoutes>
        </div>
    )
}

export default Routes
