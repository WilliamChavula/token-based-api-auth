"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drizzle_kit_1 = require("drizzle-kit");
var config_1 = require("./src/lib/config");
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: "./migrations",
    schema: "./src/lib/auth/models/index.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: config_1.config.DB_URL,
    },
});
