import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { db } from "../db";

const dbPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  try {
    fastify.decorate("db", db);
  } catch (error) {
    fastify.log.error(error);
    throw error;
  }
};

export default fp(dbPlugin);
