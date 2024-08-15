import { FastifyReply } from "fastify";
import { z } from "zod";
import prisma from "@/database/prisma-client";
import jsonwebtoken from "jsonwebtoken";
import { IFastifyRequestWithUser } from "@/interfaces/IRequestWithUser";

async function authMiddleware(request: IFastifyRequestWithUser, reply: FastifyReply) {
  const BodySchema = z.object({
    authorization: z.string(),
  });

  const { authorization } = BodySchema.parse(request.headers);

  const decoded = jsonwebtoken.verify(authorization, process.env.JWT_SECRET?.toString() || "", {
    maxAge: "10h",
  });

  if (!decoded) return reply.status(401).send();

  const { id } = decoded as { id: string };

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return reply.status(404).send();

  request.locals = { user };
}

export { authMiddleware };
