import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  redirect = "/login",
  redirectAdmin = "/profile",
}) => {
  const { loading} = useSelector((state) => state.user);

  if(loading===false)
  {
    
    if (loading===false&& !isAuthenticated) {
      return <Navigate to={redirect} />;
    }
  
    if (adminRoute===true&& !isAdmin ) {
      return <Navigate to={redirectAdmin} />;
    }
  }
  return children ? children : <Outlet />;

  }


export default ProtectedRoute;