"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.schemas = void 0;
var zod_1 = require("zod");
var drizzle_zod_1 = require("drizzle-zod");
var fastify_zod_1 = require("fastify-zod");
var models_1 = require("../models");
var insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(models_1.usersTable, {
    password: function (schema) { return schema.min(8).max(20); },
    email: function (schema) { return schema.email(); },
});
var selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(models_1.usersTable).omit({
    password: true,
});
var loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.schemas = (_a = (0, fastify_zod_1.buildJsonSchemas)({
    insertUserSchema: insertUserSchema,
    selectUserSchema: selectUserSchema,
    loginUserSchema: loginUserSchema,
}), _a.schemas), exports.$ref = _a.$ref;
