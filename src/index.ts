import runServer from "./server";

const port = parseInt(process.env.PORT || "7500", 10);

runServer().then((server) => {
  console.log("🟢 Starting Fastify app...");
  server
    .listen({ port, host: "0.0.0.0" })
    .then(() => server.log.info(`Server started on port ${port}`))
    .catch((err) => server.log.error(err));
});
