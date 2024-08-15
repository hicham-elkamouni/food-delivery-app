import { FC } from "react";
import { Router } from "@/routes/router";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const App: FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
