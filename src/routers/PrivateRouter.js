import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Firebase/AuthContext';


const PrivateRoute = () => {
    const location = useLocation();
    const currentUser = useAuth();

    return (
        currentUser.currentUser ? <Outlet /> : <Navigate to={"/login"} state={{ from: location }}/> 
    );
}

export default PrivateRoute;
