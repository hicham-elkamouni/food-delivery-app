import { IProduct, ICartXProduct } from "@/interfaces/IProduct";
import apiFood from "@/services/apiFood";
import { FC, ReactNode, createContext, useContext, useMemo, useState } from "react";
import useAuth from "@/context/AuthContext";

interface CartContextProps {
  cartListMemo: ICartXProduct[] | undefined;
  createCart: () => void;
  postNewProductOnCart: (Product: IProduct) => void;
  removeProductFromCart: (Product: IProduct) => void;
  updateProductFromCart: (Product: IProduct, quantity: number) => void;
}

interface ProductProviderProps {
  children: ReactNode;
}

const CartContext = createContext({} as CartContextProps);

const CartProvider: FC<ProductProviderProps> = ({ children }) => {
  const [productCartList, setProductList] = useState<ICartXProduct[]>();
  const cartListMemo = useMemo(() => productCartList, [productCartList]);
  const { user } = useAuth();

  const hasProductOnCart = (Product: IProduct) => {
    if (cartListMemo) {
      return cartListMemo.some((item) => item.productId === Product.id);
    }
  };

  const createCart = async () => {
    try {
      const result = await apiFood.get(`/cart/${user.id}`, {
        headers: {
          Authorization: user.token,
        },
      });

      const cart = result.data[0].cartXProduct;

      setProductList(cart);

      return cart;
    } catch (error) {
      console.error(error);
    }
  };

  const postNewProductOnCart = async (Product: IProduct) => {
    if (hasProductOnCart(Product)) {
      const quantity = cartListMemo?.find((item) => item.productId === Product.id)?.quantity;

      updateProductFromCart(Product, (quantity ? quantity : 0) + 1);

      return;
    }

    try {
      await apiFood.post(
        "/cart",
        {
          userId: user.id,
          productId: Product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      createCart();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProductFromCart = async (Product: IProduct, quantity: number) => {
    try {
      await apiFood.put(
        `/cart`,
        {
          userId: user.id,
          productId: Product.id,
          quantity,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      createCart();
    } catch (error) {
      console.error(error);
    }
  };

  const removeProductFromCart = async (Product: IProduct) => {
    try {
      await apiFood.delete(`/cart`, {
        data: {
          userId: user.id,
          productId: Product.id,
        },
        headers: {
          Authorization: user.token,
        },
      });

      createCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartListMemo,
        createCart,
        postNewProductOnCart,
        updateProductFromCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };

export default function useCart() {
  return useContext(CartContext);
}
