import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFood from "@/services/apiFood";
import useAuth from "@/context/AuthContext";
import { Login, Register } from "@/containers";
import { Box, Typography } from "@mui/material";
import LoginBanner from "@/assets/images/login_banner.jpg";

export const LoginPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isToRegister, setIsToRegister] = useState(false);

  const handleRegisterInterface = () => setIsToRegister((isToRegister) => !isToRegister);

  const checkLogin = async () => {
    if (!user.token) return;

    let isLogged = false;

    try {
      const response = await apiFood.get("/users", {
        headers: {
          Authorization: user.token,
        },
      });

      if (response.status === 200) isLogged = true;
    } catch (error) {
      console.error(error);
    }

    if (isLogged) navigate("/menu");
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
      }}
      component="main"
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#35BF98",
          height: { xs: "50%", md: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", md: "50%" },
            margin: "50px",
            padding: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <img
            src={LoginBanner}
            alt="banner login"
            style={{
              maxWidth: "100%",
              marginBottom: "16px",
              borderRadius: "8px",
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              marginBottom: "16px",
              color: "#333333",
            }}
          >
            Delicie-se com o melhor da gastronomia ao alcance de toque do nosso app de comida, que
            traz sabor e praticidade direto para você!
          </Typography>
        </Box>
      </Box>
      {isToRegister ? (
        <Register changeLoginType={handleRegisterInterface} />
      ) : (
        <Login changeLoginType={handleRegisterInterface} />
      )}
    </Box>
  );
};
