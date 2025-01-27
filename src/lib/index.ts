import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { schemas } from "./auth/schemas";

import healthRoutes from "./health/routes";
import authRoutes from "./auth/routes";

export default fp(async (fastify: FastifyInstance) => {
  for (const schema of schemas) {
    fastify.addSchema(schema);
  }

  fastify.register(healthRoutes, { prefix: "/health" });
  fastify.register(authRoutes, { prefix: "/auth" });
});
