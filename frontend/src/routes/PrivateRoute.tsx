import { ILogUser } from "@/interfaces/ILogUser";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = (userData: ILogUser) => {
  const { token } = userData;

  return token ? <Outlet /> : <Navigate to="/login" />;
};
