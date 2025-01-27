import {
  pgTable,
  serial,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: serial("user_id").primaryKey().notNull(),
  firstName: varchar("first_name", { length: 30 }).notNull(),
  middleName: varchar("middle_name", { length: 30 }),
  lastName: varchar("last_name", { length: 30 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tokenTable = pgTable(
  "tokens",
  {
    tokenId: varchar("token_id").primaryKey().notNull(),
    userId: varchar("user_id", { length: 30 }).notNull(),
    expiry: timestamp().notNull(),
  },
  (table) => {
    return [
      index("username_idx").on(table.userId),
      index("expiry_idx").on(table.expiry),
    ];
  },
);
