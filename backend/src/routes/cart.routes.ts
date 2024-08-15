import { FastifyInstance } from "fastify";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  addProtuctToCart,
  showCart,
  deleteProductFromCart,
  updateProductFromCart,
} from "@/controllers/cart.controller";

export async function cartRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.get("/cart/:id", showCart);
  app.post("/cart", addProtuctToCart);
  app.delete("/cart", deleteProductFromCart);
  app.put("/cart", updateProductFromCart);
}
