import React from 'react'
import { Routes as AppRoutes, Route, Link } from "react-router-dom";
import NavforUser from '../components/Nav/NavforUser';
import EmpHome from '../employee/EmpHome';
import Survey from '../employee/Survey';
const UserRoutes = () => {
    return (
        <div>
        <NavforUser/>
        <AppRoutes>
        <Route path="/" element={<EmpHome/>} />
        <Route path="/survey" element={<Survey/>} />
       </AppRoutes>  
        </div>
    )
}

export default UserRoutes
