import { Request } from "express";
import * as ParamType from "../types/parameter.type";
import z from "zod";

export const requestToken = (req: Request): ParamType.Auth.requestToken => {
  const obj = {
    email: req.body.email,
    password: req.body.password,
  };

  const schema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password minimum invalid")
      .max(20, "Password maximum invalid"),
  });

  const data = schema.parse(obj);

  return data;
};

export const refreshToken = (req: Request): ParamType.Auth.refreshToken => {
  const obj = {
    sessionId: req.get("x-session-id"),
  };

  const schema = z.object({
    sessionId: z.string({ required_error: "Session is required" }),
  });

  const data = schema.parse(obj);

  return data;
};

export const revokeToken = (req: Request): ParamType.Auth.revokeToken => {
  const obj = {
    sessionId: req.get("x-session-id"),
  };

  const schema = z.object({
    sessionId: z.string({ required_error: "Refresh token is required" }),
  });

  const data = schema.parse(obj);

  return data;
};
