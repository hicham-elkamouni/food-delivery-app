import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import {
  AdminProduct,
  CartPage,
  HelloWorldPage,
  LoginPage,
  MenuPage,
  ProfileUserPage,
} from "@/pages";
import { PrivateRoute } from "@/routes/PrivateRoute";
import useAuth from "@/context/AuthContext";
import { Layout } from "@/containers";

export const Router: FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Outlet />
            </Fragment>
          }
        >
          <Route path="/hello-world" element={<HelloWorldPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={<PrivateRoute email={user.email} token={user.token} id={user.id} />}
          >
            <Route path="/" element={<Layout />}>
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/profile" element={<ProfileUserPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin-product" element={<AdminProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
