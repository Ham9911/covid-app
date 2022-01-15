import React from 'react'
import { Routes as AppRoutes, Route, Link } from "react-router-dom";
import AdminHome from '../admin/AdminHome';
import Reports from '../admin/Reports';
import NavAfterLogin from '../components/Nav/NavAfterLogin';
const LoggedinRoutes = () => {
    return (
        <div>
        <NavAfterLogin/>
        <AppRoutes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/reports" element={<Reports/>} />
       </AppRoutes>  
        </div>
    )
}

export default LoggedinRoutes
