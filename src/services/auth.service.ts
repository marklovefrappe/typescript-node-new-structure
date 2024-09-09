import * as db from "../db/function/user";
import SessionModel from "../db/models/session.model";
import * as ParamType from "../types/parameter.type";
import * as ReturnType from "../types/return.type";
import { CustomError } from "../utils/error";
import * as tokenFunc from "../utils/token";

export const requestToken = async ({
  email,
  password,
}: ParamType.Auth.requestToken): Promise<ReturnType.Auth.RequestToken> => {
  // Find user
  const user = await db.findByEmail({ email });
  if (!user)
    throw new CustomError("auth.error.user_not_found", "User is not found");

  // Check verified status
  if (!user.verifiedStatus)
    throw new CustomError(
      "auth.error.user_not_verified",
      "User is not verified",
    );

  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid)
    throw new CustomError("auth.error.invalid_password", "Password is invalid");

  // Create session
  const session = await SessionModel.create({ user: user.id });

  // Sign token
  const accessPayload: ReturnType.Auth.AccessTokenPayload = {
    sessionId: session.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const refreshPayload: ReturnType.Auth.RefreshTokenPayload = {
    sessionId: session.id,
  };
  const accessToken = tokenFunc.signToken({ payload: accessPayload });
  const refreshToken = tokenFunc.signToken({
    payload: refreshPayload,
    expireTime: "1y",
  });

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

export const refreshToken = async ({
  sessionId,
}: ParamType.Auth.refreshToken): Promise<ReturnType.Auth.RefreshToken> => {
  // Get session
  const session = await SessionModel.findById(sessionId).populate<{
    user: ReturnType.Auth.UserDocument;
  }>("user");
  if (!session || !session.valid || session.isRefresh || !session.user)
    throw new CustomError(
      "auth.error.session_not_found",
      "Session is not found",
    );

  // Create new session, update session
  session.valid = false;
  session.isRefresh = true;
  const [newSession] = await Promise.all([
    SessionModel.create({ user: session.user.id }),
    session.save(),
  ]);

  // Sign token
  const accessPayload = {
    sessionId: newSession.id,
    email: session.user.email,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
  };
  const refreshPayload = {
    sessionId: newSession.id,
  };
  const accessToken = tokenFunc.signToken({ payload: accessPayload });
  const refreshToken = tokenFunc.signToken({
    payload: refreshPayload,
    expireTime: "1y",
  });

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

export const revokeToken = async ({
  sessionId,
}: ParamType.Auth.revokeToken): Promise<string> => {
  // Verify token
  // const payload = tokenFunc.verifyToken<
  //     Pick<ReturnType.Auth.AccessTokenPayload, 'sessionId'> & Partial<Omit<ReturnType.Auth.AccessTokenPayload, 'sessionId'>>
  // >({
  //     token
  // });

  // Get session
  const session = await SessionModel.findById(sessionId).populate<{
    user: ReturnType.Auth.UserDocument;
  }>("user");
  if (!session || !session.valid || session.isRefresh || !session.user)
    throw new CustomError(
      "auth.error.session_not_found",
      "Session is not found",
    );

  // Update session
  session.valid = false;
  await session.save();

  return "Revoke token successfully";
};
