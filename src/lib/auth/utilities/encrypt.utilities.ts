import crypto from "crypto";
import { TAuthTokenStore } from "./types";
import { config } from "../../config";

export const tokenStore: TAuthTokenStore = {
  generateTokenId(): string {
    return crypto.randomBytes(20).toString("hex");
  },

  computeHash(tokenId: string): string {
    const hash = crypto.createHmac("sha256", config.HASH_KEY);

    return hash.update(tokenId).digest("hex");
  },

  hmacToken(tokenId: string): string {
    const tokenHash = this.computeHash(tokenId);

    return `${tokenId}.${tokenHash}`;
  },

  compareHash(tokenHash: string, computedHash: string): boolean {
    return crypto.timingSafeEqual(
      Buffer.from(tokenHash),
      Buffer.from(computedHash),
    );
  },
};
