"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const port = parseInt(process.env.PORT || "7500", 10);
(0, server_1.default)().then((server) => {
    console.log("🟢 Starting Fastify app...");
    server
        .listen({ port, host: "0.0.0.0" })
        .then(() => server.log.info(`Server started on port ${port}`))
        .catch((err) => server.log.error(err));
});
