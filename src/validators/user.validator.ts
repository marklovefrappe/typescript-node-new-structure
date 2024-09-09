import { Request } from "express";
import * as ParamType from "../types/parameter.type";
import z from "zod";

export const createUser = (req: Request): ParamType.User.createUser => {
  const obj = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  };

  const schema = z
    .object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password minimum invalid")
        .max(20, "Password maximum invalid"),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Password do not match",
    });

  const data = schema.parse(obj);

  return data;
};

export const verifyUser = (req: Request): ParamType.User.verifyUser => {
  const obj = {
    id: req.params.id,
    code: req.body.code,
  };

  const schema = z.object({
    id: z
      .string({ required_error: "User id is required" })
      .min(24, "Error adding User id")
      .max(24, "Error adding User id"),
    code: z.string({ required_error: "Verification code is required" }),
  });

  const data = schema.parse(obj);

  return data;
};

export const requestForgetPassword = (
  req: Request,
): ParamType.User.requestForgetPassword => {
  const obj = {
    email: req.body.email,
  };

  const schema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
  });

  const data = schema.parse(obj);

  return data;
};

export const confirmForgetPassword = (
  req: Request,
): ParamType.User.confirmForgetPassword => {
  const obj = {
    email: req.body.email,
    passwordResetCode: req.body.passwordResetCode,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  };

  const schema = z
    .object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      passwordResetCode: z.string({
        required_error: "Password reset code is required",
      }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password minimum invalid")
        .max(20, "Password maximum invalid"),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Password do not match",
    });

  const data = schema.parse(obj);

  return data;
};
