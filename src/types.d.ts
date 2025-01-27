import { TPostgresDataBase } from "./lib/db";
import { TAuthService } from "./lib/auth/services";

declare module "fastify" {
  interface FastifyInstance {
    db: TPostgresDataBase;
    authService: TAuthService;
  }
}
