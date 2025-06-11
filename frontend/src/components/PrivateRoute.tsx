import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>

    return isAuthenticated ? children : <Navigate to="/"/>
};

export default PrivateRoute;