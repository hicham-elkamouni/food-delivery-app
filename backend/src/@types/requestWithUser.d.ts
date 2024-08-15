import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    locals: {
      user: {
        id: string;
        name: string | null;
        email: string;
        avatar_url: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    };
  }
}
