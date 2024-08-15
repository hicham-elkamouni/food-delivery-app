import { GridProducts } from "@/containers";
import useCart from "@/context/CartContext";
import { FC, useEffect } from "react";

export const MenuPage: FC = () => {
  const { createCart } = useCart();

  useEffect(() => {
    createCart();
  }, []);

  return (
    <>
      <GridProducts />
    </>
  );
};
