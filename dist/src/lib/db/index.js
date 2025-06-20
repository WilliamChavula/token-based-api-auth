"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const config_1 = require("../config");
exports.db = (0, node_postgres_1.drizzle)(config_1.config.DB_URL);
