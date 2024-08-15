import { FastifyInstance } from "fastify";
import { Create, Delete, List, Show, Update } from "@/controllers/users.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.get("/users", List);
  app.get("/user/:id", Show);
  app.put("/user/:id", Update);
  app.delete("/user/:id", Delete);
}
