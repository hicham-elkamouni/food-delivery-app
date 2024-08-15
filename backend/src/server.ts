import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import "module-alias/register";
import {
  cartRoutes,
  helloWorldRoutes,
  productsRoutes,
  publicRoutes,
  uploadRoute,
  userRoutes,
} from "@/routes";
import multipart from "@fastify/multipart";

const app: FastifyInstance = fastify({ logger: false });

app.register(cors, { origin: true });

app.decorateReply("locals", { user: null });

app.register(helloWorldRoutes);
app.register(multipart);
app.register(uploadRoute);
app.register(publicRoutes);
app.register(userRoutes);
app.register(cartRoutes);
app.register(productsRoutes);

const port = Number(process.env.PORT) || 3333;

app.listen(
  {
    port,
  },
  (err) => {
    if (err) console.error(err);
    else console.log(`FOOD API Running on http://localhost:${port}`);
  }
);
