import express from "express";
import { AnyZodObject } from "zod";
import { errorHandler } from "../utils/error";

const validateResource =
  (schema: AnyZodObject) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      schema.parse({
        body: req.body,
      });
      next();
    } catch (error) {
      const { statusCode, errorResponse } = errorHandler(error);
      return res.status(statusCode).send(errorResponse);
    }
  };

export default validateResource;
