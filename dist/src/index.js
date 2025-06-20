"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var port = parseInt(process.env.PORT || "7500", 10);
(0, server_1.default)().then(function (server) {
    console.log("🟢 Starting Fastify app...");
    server
        .listen({ port: port, host: "0.0.0.0" })
        .then(function () { return server.log.info("Server started on port ".concat(port)); })
        .catch(function (err) { return server.log.error(err); });
});
