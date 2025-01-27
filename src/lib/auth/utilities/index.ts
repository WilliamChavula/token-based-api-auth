import bcrypt from "bcrypt";
import { THash } from "./types";

export const bcryptHash: THash = {
  async hash(pwd: string, rounds: number = 10): Promise<string> {
    return bcrypt.hash(pwd, rounds);
  },

  async compare(pwd: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pwd, hash);
  },
};
