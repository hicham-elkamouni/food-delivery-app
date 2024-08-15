import useAuth from "@/context/AuthContext";
import useCart from "@/context/CartContext";
import { IUser } from "@/interfaces/IUser";
import apiFood from "@/services/apiFood";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultImageUser from "@/assets/icons/profile-default.svg";
import MenuIcon from "@mui/icons-material/Menu";

export const Header: FC = () => {
  const { logout, user } = useAuth();
  const { cartListMemo } = useCart();
  const [totalProducts, setTotalProducts] = useState(0);
  const [userData, setUserData] = useState({} as IUser);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getUserData = async () => {
    if (!user.token) return;

    try {
      const response = await apiFood.get(`/user/${user.id}`, {
        headers: {
          Authorization: user.token,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    let total = 0;
    cartListMemo?.forEach((cartProduct) => {
      total += cartProduct.quantity;
    });
    setTotalProducts(total);
  }, [cartListMemo]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#35BF98",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {isMobile && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Link
        style={{ margin: 0, color: "#fff", textDecoration: "none", fontSize: "40px" }}
        to="/menu"
      >
        The Food
      </Link>
      {!isMobile && (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Link to="/menu" style={buttonLinkStyle}>
            Menu
          </Link>
          <Link to="/profile" style={buttonLinkStyle}>
            Perfil
          </Link>
          <Link to="/cart" style={buttonLinkStyle}>
            Seu carrinho ({totalProducts})
          </Link>
          <Link to="/admin-product" style={buttonLinkStyle}>
            Criar produto
          </Link>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="body1"
          sx={{ marginRight: "1rem", color: "#fff", display: { xs: "none", md: "block" } }}
        >
          Bem vindo <Typography variant="subtitle2">{userData.name}</Typography>
        </Typography>
        <img
          src={
            userData.avatar_url
              ? `${apiFood.defaults.baseURL}/${userData.avatar_url}`
              : DefaultImageUser
          }
          alt="avatar do usuário"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <Button
          variant="contained"
          onClick={logout}
          sx={{
            backgroundColor: "#D32F2F",
            color: "#fff",
          }}
        >
          Logout
        </Button>
      </Box>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "& .MuiDrawer-paper": {
            backgroundColor: "#35BF98",
          },
        }}
      >
        <Box
          sx={{
            width: 200,
            backgroundColor: "#35BF98",
            height: "100%",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <List>
            <ListItem>
              <Link to="/menu" style={buttonLinkStyle}>
                Menu
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/profile" style={buttonLinkStyle}>
                Perfil
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/cart" style={buttonLinkStyle}>
                Seu carrinho ({totalProducts})
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/admin-product" style={buttonLinkStyle}>
                Criar produto
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

const buttonLinkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontSize: "1rem",
  padding: "8px 16px",
  borderRadius: "4px",
  backgroundColor: "#1976D2",
  display: "inline-block",
  cursor: "pointer",
};
