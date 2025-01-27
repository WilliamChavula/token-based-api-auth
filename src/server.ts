import fastify from "fastify";

import dbPlugin from "./lib/plugins/database.plugin";
import lib from "./lib";

const runServer = async () => {
  const server = fastify({
    logger: true,
  });

  server.register(dbPlugin);

  server.register(lib);

  return server;
};

export default runServer;
