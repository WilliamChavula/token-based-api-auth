import { defineConfig } from "drizzle-kit";
import { config } from "./src/lib/config";

export default defineConfig({
  out: "./migrations",
  schema: "./src/lib/auth/models/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DB_URL,
  },
});
