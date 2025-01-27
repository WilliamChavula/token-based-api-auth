export interface THash {
  hash: (pwd: string, rounds: number = 10) => Promise<string>;
  compare: (pwd: string, hash: string) => Promise<boolean>;
}
