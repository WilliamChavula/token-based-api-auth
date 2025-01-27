import { TPostgresDataBase } from "./lib/auth/models/connect";
import { TAuthService } from "./lib/auth/services";

declare module "fastify" {
  interface FastifyInstance {
    db: TPostgresDataBase;
    authService: TAuthService;
  }
}
