import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import type { TInsertUserSchema, TSelectUserSchema } from "../schemas";
import { usersTable } from "../models";

export interface TAuthService {
  create: (data: TInsertUserSchema) => Promise<TSelectUserSchema>;
}

export default fp(async function (fastify: FastifyInstance) {
  fastify.decorate<TAuthService>("authService", {
    async create(data: TInsertUserSchema): Promise<TSelectUserSchema> {
      const [user] = await fastify.db
        .insert(usersTable)
        .values(data)
        .returning();

      return user;
    },
  });
});
