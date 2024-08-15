import { FC } from "react";
import { Footer, Header } from "@/containers";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export const Layout: FC = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};
