import express from "express";
import { verifyToken } from "../utils/token";
import dayjs from "dayjs";
import { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../utils/error";

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const _token = req.get("Authorization");
    if (!_token)
      throw new CustomError(
        "server.error.unauthorization",
        "Unauthorization",
        401,
      );

    const [_, token] = _token.split(" ");
    const payload = verifyToken<JwtPayload>({ token: token ?? _ });

    req.headers["x-token-id"] = token;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    payload.iat
      ? (req.headers["x-signed-time"] = dayjs.unix(payload.iat).toISOString())
      : undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    payload.exp
      ? (req.headers["x-expired-time"] = dayjs.unix(payload.exp).toISOString())
      : undefined;
    req.headers["x-session-id"] = payload.sessionId;
    req.headers["x-subject"] = payload.sub;
    req.headers["x-issuer"] = payload.iss;
    req.headers["x-audience"] = payload.aud;

    next();
  } catch (error: unknown) {
    next(error);
  }
};
