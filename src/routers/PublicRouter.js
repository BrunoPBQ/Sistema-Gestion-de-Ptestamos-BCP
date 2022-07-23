import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Firebase/AuthContext'; 

const PublicRoute = () => {
    const location = useLocation();
    const currentUser = useAuth();
    let previusURL = location.state?.from.pathname || "/";
    return (
        <>
            {!currentUser.currentUser ? <Outlet /> : <Navigate to={previusURL}/>}
        </>
    );
}

export default PublicRoute;