import { NextFunction, Request, Response } from "express";
import * as validate from "../validators/user.validator";
import * as service from "../services/user.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validate.createUser(req);
    const result = await service.createUser(data);
    return res.status(201).send(result);
  } catch (error: unknown) {
    next(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validate.verifyUser(req);
    const result = await service.verifyUser(data);
    return res.status(201).send(result);
  } catch (error: unknown) {
    next(error);
  }
};

export const requestForgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validate.requestForgetPassword(req);
    const result = await service.requestForgetPassword(data);
    return res.status(201).send(result);
  } catch (error: unknown) {
    next(error);
  }
};

export const confirmForgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = validate.confirmForgetPassword(req);
    const result = await service.confirmForgetPassword(data);
    return res.status(201).send(result);
  } catch (error: unknown) {
    next(error);
  }
};
