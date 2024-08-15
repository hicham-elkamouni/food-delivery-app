import { FC } from "react";
import useCart from "@/context/CartContext";
import apiFood from "@/services/apiFood";
import { Box, Button, Typography } from "@mui/material";
import { capitalizeOnlyFirstLetter } from "@/utils/utils";

export const CartPage: FC = () => {
  const { cartListMemo, removeProductFromCart } = useCart();

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#35BF98",
        color: "#FFFFFF",
      }}
    >
      {cartListMemo && cartListMemo.length > 0 ? (
        <>
          <Typography variant="h4">Seu carrinho</Typography>
          {cartListMemo?.map((item, key) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "20px",
                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                padding: "10px",
              }}
            >
              <img
                src={`${apiFood.defaults.baseURL}/${item.product.image_url}`}
                alt={`Imagem do ${item.product.name}`}
                style={{ height: "100px", borderRadius: "50%", marginRight: "20px" }}
              />
              <Box
                sx={{
                  color: "black",
                }}
              >
                <Typography variant="h6">{capitalizeOnlyFirstLetter(item.product.name)}</Typography>
                <Typography>{capitalizeOnlyFirstLetter(item.product.description)}</Typography>
                <Typography>R$ {item.product.price}</Typography>
                <Typography>Quantidade: {item.quantity}</Typography>
                <Button onClick={() => removeProductFromCart(item.product)} variant="contained">
                  Remover
                </Button>
              </Box>
            </Box>
          ))}

          <Button onClick={() => alert("Em breve...")} variant="contained">
            Comprar
          </Button>
        </>
      ) : (
        <Typography variant="h4">Seu carrinho está vazio</Typography>
      )}
    </Box>
  );
};
