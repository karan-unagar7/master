import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated }) => {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;
