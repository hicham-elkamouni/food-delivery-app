import { FastifyInstance } from "fastify";
import { Show } from "@/controllers/helloWorld.controller";

export async function helloWorldRoutes(app: FastifyInstance) {
  app.get("/hello-world", Show);
}
