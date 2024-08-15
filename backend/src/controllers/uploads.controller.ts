import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import { IFastifyRequestWithUser } from "@/interfaces/IRequestWithUser";
import prisma from "@/database/prisma-client";
import { ParamsSchema } from "@/config/zod";

const pump = util.promisify(pipeline);

async function uploadImageToOnlineUser(request: IFastifyRequestWithUser, reply: FastifyReply) {
  const parts = request.files();
  const currentTime = new Date().getTime();
  const imagePath = `src/uploads/${currentTime}.jpg`;
  const avatar_url = `uploads/${currentTime}.jpg`;

  for await (const part of parts) {
    await pump(part.file, fs.createWriteStream(imagePath));
  }

  const { id } = request.locals.user;

  await prisma.user.update({
    data: { avatar_url },
    where: { id },
  });

  reply.status(201).send({ message: "File uploaded successfully", avatar_url });
}

async function uploadImageToProduct(request: FastifyRequest, reply: FastifyReply) {
  const parts = request.files();
  const currentTime = new Date().getTime();
  const imagePath = `src/uploads/${currentTime}.jpg`;
  const image_url = `uploads/${currentTime}.jpg`;

  const { id } = ParamsSchema.parse(request.params);

  for await (const part of parts) {
    await pump(part.file, fs.createWriteStream(imagePath));
  }

  await prisma.product.update({
    data: { image_url },
    where: { id },
  });

  reply.status(201).send({ message: "File uploaded successfully", image_url });
}

export { uploadImageToOnlineUser, uploadImageToProduct };
