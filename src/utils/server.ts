import express from "express";
import configs from "../configs/configs";
import connectToDb from "./db";
import log from "./logger";

export const createServer = () => {
  const server = express();

  return server;
};

export const listenServer = (server: express.Express) => {
  server.listen(configs.port, async () => {
    log.info(`Server running at http://${configs.server}:${configs.port}`);

    await connectToDb();
  });
};
