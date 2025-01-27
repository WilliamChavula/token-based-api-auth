import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { buildJsonSchemas } from "fastify-zod";

import { usersTable } from "../models";

const insertUserSchema = createInsertSchema(usersTable);
const selectUserSchema = createSelectSchema(usersTable).omit({
  password: true,
});

export const { schemas, $ref } = buildJsonSchemas({
  insertUserSchema,
  selectUserSchema,
});

export type TInsertUserSchema = z.infer<typeof insertUserSchema>;
export type TSelectUserSchema = z.infer<typeof selectUserSchema>;
