import { FastifyInstance } from "fastify";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  createProduct,
  showProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from "@/controllers/products.controller";

export async function productsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.get("/product/:id", showProduct);
  app.post("/product", createProduct);
  app.get("/products", listProducts);
  app.put("/product/:id", updateProduct);
  app.delete("/product/:id", deleteProduct);
}
