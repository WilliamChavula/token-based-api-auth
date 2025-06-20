"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const zod_1 = require("zod");
require("dotenv/config");
const environmentVars = zod_1.z.object({
    DB_URL: zod_1.z.string({ required_error: "Database URL cannot be empty" }),
    HASH_KEY: zod_1.z.string({ required_error: "Hash key cannot be empty" }),
});
exports.config = environmentVars.parse(process.env);
