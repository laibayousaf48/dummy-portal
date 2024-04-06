import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function PrivateRouteWrapper() {
  const authCtx = useContext(AuthContext);
  const location = useLocation()
  if (!authCtx.isLoggedIn) {
    return <Navigate to={`/login`} state={{ from: location.pathname + location.search }} />;
  }
  return <Outlet />;
}

export default PrivateRouteWrapper;
