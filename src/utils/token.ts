import jwt from "jsonwebtoken";
import * as TokenType from "../types/utils/token.type";

export const signToken = ({
  payload,
  type = "sym",
  expireTime = "5m",
}: TokenType.SignToken): string => {
  const jwtOption: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: expireTime,
    subject: "auth",
    audience: "postman",
    issuer: "server",
  };

  if (type === "asym") {
    jwtOption.algorithm = "RS256";
  }

  const token = jwt.sign(payload, "secret", jwtOption);

  return token;
};

export const verifyToken = <T>({
  token,
  type = "sym",
}: TokenType.Verifytoken): T => {
  if (type === "asym") {
    // jwtOption.algorithm = 'RS256';
  }

  const data = jwt.verify(token, "secret") as T;

  return data;
};
