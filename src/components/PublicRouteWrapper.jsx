import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";
import LoginScreen from "../modules/Auth/LoginScreen.jsx";

function PublicRouteWrapper() {
  const authCtx = useContext(AuthContext)
  if(authCtx.isLoggedIn) {
    return <Navigate to={"/"} />
  }
  return <Outlet />
}

export default PublicRouteWrapper;