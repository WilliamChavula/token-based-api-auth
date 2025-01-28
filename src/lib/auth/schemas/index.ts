import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { buildJsonSchemas } from "fastify-zod";

import { usersTable } from "../models";

const insertUserSchema = createInsertSchema(usersTable, {
  password: (schema) => schema.min(8).max(20),
  email: (schema) => schema.email(),
});
const selectUserSchema = createSelectSchema(usersTable).omit({
  password: true,
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const { schemas, $ref } = buildJsonSchemas({
  insertUserSchema,
  selectUserSchema,
  loginUserSchema,
});

export type TInsertUserSchema = z.infer<typeof insertUserSchema>;
export type TSelectUserSchema = z.infer<typeof selectUserSchema>;
export type TLoginUserSchema = z.infer<typeof loginUserSchema>;
