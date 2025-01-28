import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { eq, InferSelectModel } from "drizzle-orm";

import type { TInsertUserSchema, TSelectUserSchema } from "../schemas";
import { tokenTable, usersTable } from "../models";
import { bcryptHash, tokenStore } from "../utilities";
import { TAuthToken } from "../utilities/types";

type User = InferSelectModel<typeof usersTable>;

export interface TAuthService {
  createUser: (data: TInsertUserSchema) => Promise<TSelectUserSchema>;
  getUserByEmail: (email: string) => Promise<User | null>;
  createToken: (email: string) => Promise<string>;
  deleteToken: (tokenId: string) => Promise<void>;
  readToken: (tokenId: string) => Promise<TAuthToken | null>;
  verifyToken: (token: string) => Promise<TAuthToken | null>;
}

export default fp(async function (fastify: FastifyInstance) {
  fastify.decorate<TAuthService>("authService", {
    async createUser(data: TInsertUserSchema): Promise<TSelectUserSchema> {
      const { password } = data;

      const hashedPassword = await bcryptHash.hash(password);

      const [user] = await fastify.db
        .insert(usersTable)
        .values({ ...data, password: hashedPassword })
        .returning();

      return user;
    },

    async getUserByEmail(email: string): Promise<User | null> {
      const [user] = await fastify.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      return user;
    },

    async createToken(email: string): Promise<string> {
      const [user] = await fastify.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) throw new Error("User not found");

      const token = tokenStore.generateTokenId();
      const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

      await fastify.db
        .insert(tokenTable)
        .values({ userId: user.userId, tokenId: token, expiry });

      return token;
    },

    async readToken(tokenId: string): Promise<TAuthToken | null> {
      const [token] = await fastify.db
        .select()
        .from(tokenTable)
        .where(eq(tokenTable.tokenId, tokenId));

      if (!token) return null;

      return {
        userId: token.userId,
        tokenId: token.tokenId,
        expiry: token.expiry,
      } as TAuthToken;
    },

    async deleteToken(tokenId: string): Promise<void> {
      await fastify.db
        .delete(tokenTable)
        .where(eq(tokenTable.tokenId, tokenId));
    },

    async verifyToken(tokenRaw: string): Promise<TAuthToken | null> {
      const tokenIndex = tokenRaw.lastIndexOf(".");

      if (tokenIndex === -1) return null;

      const token = tokenRaw.substring(0, tokenIndex);

      const tokenData = await fastify.authService.readToken(token);

      if (!tokenData) return null;

      const tokenHash = tokenRaw.substring(tokenIndex + 1);

      const computedHash = tokenStore.computeHash(tokenData.tokenId);
      console.log({ computedHash, tokenHash });

      if (!tokenStore.compareHash(tokenHash, computedHash)) return null;

      const { expiry } = tokenData;

      if (expiry < new Date()) {
        await fastify.authService.deleteToken(token);

        return null;
      }

      return tokenData;
    },
  });
});
