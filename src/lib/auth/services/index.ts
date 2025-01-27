import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import type { TInsertUserSchema, TSelectUserSchema } from "../schemas";
import { usersTable } from "../models";
import { bcryptHash } from "../utilities";

export interface TAuthService {
  create: (data: TInsertUserSchema) => Promise<TSelectUserSchema>;
}

export default fp(async function (fastify: FastifyInstance) {
  fastify.decorate<TAuthService>("authService", {
    async create(data: TInsertUserSchema): Promise<TSelectUserSchema> {
      const { password } = data;

      const hashedPassword = await bcryptHash.hash(password);

      const [user] = await fastify.db
        .insert(usersTable)
        .values({ ...data, password: hashedPassword })
        .returning();

      return user;
    },
  });
});
