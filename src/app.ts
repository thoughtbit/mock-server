import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import path from "path";
// import { createProxyMiddleware } from "http-proxy-middleware";

import { createMiddleware } from "@mswjs/http-middleware";
import { logger, stream } from "@/utils/logger";
import { handlers } from "@/handlers";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@/config";

// const jsonServerProxy = createProxyMiddleware({
//   target: "https://cnodejs.org/api",
//   changeOrigin: true,
//   pathRewrite: { "^/api": "" },
// });

class App {
  public app: Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.initializeMiddlewares();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "/public")));
    this.app.use(createMiddleware(...handlers));
    this.app.use((_req, res) => {
      res.status(404).send({ error: "Mock not found" });
    });

    // 反向代理
    // this.app.use("/api", jsonServerProxy);
  }
}

export default App;
