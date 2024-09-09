import { NextFunction, Request, Response } from "express";
import * as validate from "../validators/auth.validator";
import * as service from "../services/auth.service";

export const requestToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validate.requestToken(req);
    const result = await service.requestToken(data);
    return res.status(201).send(result);
  } catch (error: unknown) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validate.refreshToken(req);
    const result = await service.refreshToken(data);
    return res.status(201).send(result);
  } catch (error: unknown) {
    next(error);
  }
};

export const revokeToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validate.revokeToken(req);
    const result = await service.revokeToken(data);
    return res.status(201).send(result);
  } catch (error: unknown) {
    next(error);
  }
};
