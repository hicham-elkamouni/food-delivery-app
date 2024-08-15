import { ParamsSchema } from "@/config/zod";
import prisma from "@/database/prisma-client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

async function createProduct(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    image_url: z.string().optional(),
    stock: z.number(),
  });

  const { name, description, image_url, price, stock } = BodySchema.parse(request.body);

  const product = await prisma.product.create({
    data: {
      name,
      description,
      image_url,
      price,
      stock,
    },
  });

  return reply.status(201).send(product);
}

async function showProduct(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return reply.status(404).send();

  reply.status(200).send({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image_url: product.image_url,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  });
}

async function listProducts(request: FastifyRequest, reply: FastifyReply) {
  const products = await prisma.product.findMany();

  if (!products) return reply.status(404).send();

  reply.status(200).send(products);
}

async function updateProduct(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    image_url: z.string().optional(),
    stock: z.number().optional(),
  });

  const { id } = ParamsSchema.parse(request.params);

  const { name, description, price, image_url, stock } = BodySchema.parse(request.body);

  const product = await prisma.product.update({
    data: { name, description, price, image_url, stock },
    where: { id },
  });

  if (!product) return reply.status(404).send();

  return reply.status(200).send({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image_url: product.image_url,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  });
}

async function deleteProduct(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  await prisma.cartXProduct.deleteMany({
    where: { productId: id },
  });

  await prisma.product.delete({
    where: { id },
  });

  reply.status(200).send();
}

export { createProduct, showProduct, listProducts, updateProduct, deleteProduct };
