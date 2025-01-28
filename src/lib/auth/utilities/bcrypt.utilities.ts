import bcrypt from "bcrypt";
import { THashStore } from "./types";

export const bcryptHash: THashStore = {
  async hash(pwd: string, rounds: number = 10): Promise<string> {
    return bcrypt.hash(pwd, rounds);
  },

  async compare(pwd: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pwd, hash);
  },
};
