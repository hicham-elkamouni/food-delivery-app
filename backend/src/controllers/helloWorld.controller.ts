import { FastifyReply, FastifyRequest } from "fastify";

async function Show(request: FastifyRequest, reply: FastifyReply) {
  const data = { message: "Hello World!" };

  reply.send(data);
}

export { Show };
