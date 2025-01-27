import runServer from "./server";

runServer().then((server) => {
  server
    .listen({ port: 7500 })
    .then((res) => server.log.info(`Server started on port ${res}`))
    .catch((err) => server.log.error(err));
});
