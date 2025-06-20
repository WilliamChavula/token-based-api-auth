"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.schemas = void 0;
const zod_1 = require("zod");
const drizzle_zod_1 = require("drizzle-zod");
const fastify_zod_1 = require("fastify-zod");
const models_1 = require("../models");
const insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(models_1.usersTable, {
    password: (schema) => schema.min(8).max(20),
    email: (schema) => schema.email(),
});
const selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(models_1.usersTable).omit({
    password: true,
});
const loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    insertUserSchema,
    selectUserSchema,
    loginUserSchema,
}), exports.schemas = _a.schemas, exports.$ref = _a.$ref;
