"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    userId: (0, pg_core_1.serial)("user_id").primaryKey().notNull(),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 30 }).notNull(),
    middleName: (0, pg_core_1.varchar)("middle_name", { length: 30 }),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 30 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 100 }).notNull().unique(),
    password: (0, pg_core_1.varchar)("password").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.tokenTable = (0, pg_core_1.pgTable)("tokens", {
    tokenId: (0, pg_core_1.varchar)("token_id").primaryKey().notNull(),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
    expiry: (0, pg_core_1.timestamp)().notNull(),
}, (table) => {
    return [
        (0, pg_core_1.index)("username_idx").on(table.userId),
        (0, pg_core_1.index)("expiry_idx").on(table.expiry),
    ];
});
