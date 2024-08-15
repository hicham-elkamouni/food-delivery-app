import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "@/database/prisma-client";
import jsonwebtoken from "jsonwebtoken";

async function Login(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = BodySchema.parse(request.body);

  const user = await prisma.user.findUnique({
    where: { email },
    include: { cart: true },
  });

  if (!user) return reply.status(404).send();

  const match = await bcrypt.compare(password, user.password);

  if (!match) return reply.status(401).send();

  const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET?.toString() || "", {
    algorithm: "HS256",
    expiresIn: "10h",
  });

  reply.status(200).send({ token, email, id: user.id });
}

export { Login };
