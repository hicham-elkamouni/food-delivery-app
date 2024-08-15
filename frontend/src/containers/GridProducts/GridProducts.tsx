import useAuth from "@/context/AuthContext";
import useCart from "@/context/CartContext";
import { IProduct } from "@/interfaces/IProduct";
import apiFood from "@/services/apiFood";
import { capitalizeOnlyFirstLetter } from "@/utils/utils";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

export const GridProducts: FC = () => {
  const { user } = useAuth();
  const { postNewProductOnCart } = useCart();
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    if (!user.token) return;

    try {
      const response = await apiFood.get("/products", {
        headers: {
          Authorization: user.token,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={`${apiFood.defaults.baseURL}/${product.image_url}`}
              alt={`Imagem do ${product.name}`}
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h6" style={{ marginBottom: "8px" }}>
              {capitalizeOnlyFirstLetter(product.name)}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "8px" }}>
              {capitalizeOnlyFirstLetter(product.description)}
            </Typography>
            <Typography variant="h6">R$ {product.price}</Typography>
            <Button
              variant="outlined"
              onClick={() => alert("Em breve...")}
              style={{ marginTop: "8px" }}
            >
              Comprar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => postNewProductOnCart(product)}
              style={{ marginTop: "8px" }}
            >
              Adicionar ao carrinho
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
