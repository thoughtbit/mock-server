import Loki, { LokiFsAdapter } from "lokijs";
import { logger } from "@/utils/logger";
export const openDB = (name: string, options = {}) => {
  let db: any = null;

  return new Promise<void>((resolve, reject) => {
    const defaults = {
      // 启用控制台输出
      verbose: true,
      adapter: new LokiFsAdapter(),
      autosave: true,
      autoloadCallback: initializeDatabase,
      autoload: true,
      autosaveInterval: 1000,
    };

    db = new Loki(name, Object.assign(defaults, options));

    process.on("beforeExit", () => db.close());

    function initializeDatabase(error: any) {
      if (error) {
        reject(error);
      }

      ensureCollection(db, "users", { unique: ["_id"] });
      ensureCollection(db, "operations");

      logger.info(`Opened database file ${name}`);
      resolve(db);
    }
  });
};

function ensureCollection(db: any, name: string, options = {}) {
  let collection = db.getCollection(name);
  if (collection === null) {
    collection = db.addCollection(name, options);
  }
}
