export interface THashStore {
  hash: (pwd: string, rounds: number = 10) => Promise<string>;
  compare: (pwd: string, hash: string) => Promise<boolean>;
}

export type TAuthToken = {
  userId: number;
  tokenId: string;
  expiry: Date;
};

export interface TAuthTokenStore {
  generateTokenId: () => string;
  hmacToken: (tokenId: string) => string;
  compareHash: (token: string, computedHash: string) => boolean;
  computeHash: (token: string) => string;
}
