import { z } from "zod";
import "dotenv/config";

const environmentVars = z.object({
  DB_URL: z.string({ required_error: "Database URL cannot be empty" }),
  HASH_KEY: z.string({ required_error: "Hash key cannot be empty" }),
});

export const config = environmentVars.parse(process.env);
