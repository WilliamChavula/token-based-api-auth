import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import authService from "../services";
import { $ref, TInsertUserSchema } from "../schemas";

export default function (fastify: FastifyInstance) {
  fastify.register(authService);

  fastify.route({
    url: "/sign-up",
    method: "POST",
    schema: {
      body: $ref("insertUserSchema"),
      response: {
        201: $ref("selectUserSchema"),
      },
    },
    handler: async (
      req: FastifyRequest<{ Body: TInsertUserSchema }>,
      reply: FastifyReply,
    ) => {
      const body = req.body;

      const user = await fastify.authService.create(body);

      reply.code(StatusCodes.CREATED).send(user);
    },
  });
}
