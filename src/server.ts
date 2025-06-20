import fastify from "fastify";

import dbPlugin from "./lib/plugins/database.plugin";
import lib from "./lib";

const runServer = async () => {
  const server = fastify({
    logger: true,
  });

  await server.register(import("@fastify/swagger"), {
    swagger: {
      info: {
        title: "Auth API",
        description:
          "Simple API demonstrating implementation of token authentication",
        version: "1",
      },
    },
  });

  await server.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    theme: {
      title: "Auth API",
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
  server.register(dbPlugin);

  server.register(lib);

  return server;
};

export default runServer;
