import { drizzle } from "drizzle-orm/node-postgres";

import { config } from "../config";

export const db = drizzle(config.DB_URL);

export type TPostgresDataBase = ReturnType<typeof drizzle>;
