import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "@/database/prisma-client";
import { ParamsSchema } from "@/config/zod";
import bcrypt from "bcrypt";

async function Create(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cpf: z.string().min(11).max(11),
    cep: z.string().min(8).max(8),
    phone: z.string().min(9),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    address_complement: z.string(),
  });

  const { name, email, password, cpf, cep, phone, city, street, number, address_complement } =
    BodySchema.parse(request.body);

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      cpf,
      cep,
      phone,
      city,
      street,
      number,
      address_complement,
    },
  });

  await prisma.cart.create({ data: { userId: user.id } });

  if (!user) return reply.status(404).send();

  return reply.status(201).send(user.id);
}

async function List(request: FastifyRequest, reply: FastifyReply) {
  const users = await prisma.user.findMany();

  if (!users) return reply.status(404).send();

  const serialize = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    cpf: user.cpf,
    cep: user.cep,
    phone: user.phone,
    city: user.city,
    street: user.street,
    number: user.number,
    address_complement: user.address_complement,
    avatar_url: user.avatar_url,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  reply.status(200).send(serialize);
}

async function Show(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return reply.status(404).send();

  reply.status(200).send({
    id: user.id,
    name: user.name,
    email: user.email,
    cpf: user.cpf,
    cep: user.cep,
    phone: user.phone,
    city: user.city,
    street: user.street,
    number: user.number,
    address_complement: user.address_complement,
    avatar_url: user.avatar_url,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}

async function Update(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    cpf: z.string().min(11).max(11),
    cep: z.string().min(8).max(8),
    phone: z.string().min(9),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    address_complement: z.string(),
  });

  const { id } = ParamsSchema.parse(request.params);

  const { name, email, cpf, cep, phone, city, street, number, address_complement } =
    BodySchema.parse(request.body);

  const user = await prisma.user.update({
    data: { name, email, cpf, cep, phone, city, street, number, address_complement },
    where: { id },
  });

  if (!user) return reply.status(404).send();

  return reply.status(200).send({
    id: user.id,
    name: user.name,
    email: user.email,
    cpf: user.cpf,
    cep: user.cep,
    phone: user.phone,
    city: user.city,
    street: user.street,
    number: user.number,
    address_complement: user.address_complement,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}

async function Delete(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  await prisma.user.delete({
    where: { id },
  });

  reply.status(200).send();
}

export { Create, List, Update, Delete, Show };
