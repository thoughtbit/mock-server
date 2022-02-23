import type { Logger } from "winston";

declare global {
  namespace NodeJS {
    interface Global {
      db: any;
      log: Logger;
    }
  }
}

export {};
