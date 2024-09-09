import express from "express";
import logger from "../utils/logger";
import { errorHandler } from "../utils/error";

export default (server: express.Express) => {
  server.use(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      err: any,
      req: express.Request,
      res: express.Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: express.NextFunction,
    ) => {
      logger.info("Error from custom error middleware");
      logger.error(err);
      const { statusCode, errorResponse } = errorHandler(err);
      return res.status(statusCode).send(errorResponse);
    },
  );
};
