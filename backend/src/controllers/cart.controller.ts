import { ParamsSchema } from "@/config/zod";
import prisma from "@/database/prisma-client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

async function showCart(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  const user = await prisma.user.findUnique({
    where: { id },
    include: { cart: true },
  });

  const cart = await prisma.cart.findMany({
    where: { id: user?.cart[0]?.id },
    include: { cartXProduct: { include: { product: true } } },
  });

  reply.status(200).send(cart);
}

async function addProtuctToCart(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    userId: z.string(),
    productId: z.string(),
    quantity: z.number().min(1),
  });

  const { userId, productId, quantity } = BodySchema.parse(request.body);

  const user = await prisma.user.findUnique({
    where: { id: String(userId) },
    include: { cart: true },
  });

  if (!user) return reply.status(404).send({ message: "User not found" });

  await prisma.cartXProduct.create({
    data: {
      cartId: user?.cart[0].id,
      productId,
      quantity,
    },
  });

  reply.status(201);
}

async function deleteProductFromCart(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    userId: z.string(),
    productId: z.string(),
  });

  const { userId, productId } = BodySchema.parse(request.body);

  const user = await prisma.user.findUnique({
    where: { id: String(userId) },
    include: { cart: true },
  });

  if (!user) return reply.status(404).send({ message: "User not found" });

  const cartXProduct = await prisma.cartXProduct.findUnique({
    where: { cartId_productId: { cartId: user?.cart[0].id, productId } },
  });

  if (!cartXProduct) return reply.status(404).send({ message: "Product not found" });

  await prisma.cartXProduct.delete({
    where: { cartId_productId: { cartId: user?.cart[0].id, productId } },
  });

  reply.status(200);
}

async function updateProductFromCart(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    userId: z.string(),
    productId: z.string(),
    quantity: z.number().min(1),
  });

  const { userId, productId, quantity } = BodySchema.parse(request.body);

  const user = await prisma.user.findUnique({
    where: { id: String(userId) },
    include: { cart: true },
  });

  if (!user) return reply.status(404).send({ message: "User not found" });

  const cartXProduct = await prisma.cartXProduct.findUnique({
    where: { cartId_productId: { cartId: user?.cart[0].id, productId } },
  });

  if (!cartXProduct) return reply.status(404).send({ message: "Product not found" });

  await prisma.cartXProduct.update({
    where: { cartId_productId: { cartId: user?.cart[0].id, productId } },
    data: { quantity },
  });

  reply.status(200).send({ message: "Product updated" });
}

export { showCart, addProtuctToCart, deleteProductFromCart, updateProductFromCart };
