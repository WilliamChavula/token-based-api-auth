import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

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
