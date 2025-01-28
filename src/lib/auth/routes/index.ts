import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import authService from "../services";
import { $ref, TInsertUserSchema, TLoginUserSchema } from "../schemas";
import { bcryptHash, tokenStore } from "../utilities";

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

      const user = await fastify.authService.createUser(body);

      reply.code(StatusCodes.CREATED).send(user);
    },
  });

  fastify.route({
    url: "/sign-in",
    method: "POST",
    schema: {
      body: $ref("loginUserSchema"),
      response: {
        200: { type: "object", properties: { token: { type: "string" } } },
      },
    },
    preHandler: async (
      req: FastifyRequest<{ Body: TLoginUserSchema }>,
      reply: FastifyReply,
    ) => {
      const { email, password } = req.body;

      const user = await fastify.authService.getUserByEmail(email);

      if (!user) {
        return reply.code(StatusCodes.UNAUTHORIZED).send("Invalid credentials");
      }

      const isValid = await bcryptHash.compare(password, user.password);

      if (!isValid) {
        return reply.code(StatusCodes.UNAUTHORIZED).send("Invalid credentials");
      }
    },
    handler: async (
      req: FastifyRequest<{ Body: TLoginUserSchema }>,
      reply: FastifyReply,
    ) => {
      const { email } = req.body;

      const token = await fastify.authService.createToken(email);

      const tokenHMac = tokenStore.hmacToken(token);

      console.log({ token: tokenHMac });

      reply.send({ token: tokenHMac });
    },
  });

  fastify.route({
    url: "/sign-out",
    method: "POST",
    handler: async (
      req: FastifyRequest<{ Body: TLoginUserSchema }>,
      reply: FastifyReply,
    ) => {
      const token = req.headers.authorization;

      if (!token) {
        return reply
          .code(StatusCodes.UNAUTHORIZED)
          .send("You are not logged in");
      }

      const index = "Bearer ".length;
      const verifiedToken = await fastify.authService.verifyToken(
        token.substring(index),
      );
      if (!verifiedToken) {
        return reply
          .code(StatusCodes.UNAUTHORIZED)
          .send("You are not logged in");
      }
      await fastify.authService.deleteToken(verifiedToken.tokenId);

      return reply.code(StatusCodes.OK).send();
    },
  });
}
