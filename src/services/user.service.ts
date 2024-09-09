import * as db from "../db/function/user";
import * as ParamType from "../types/parameter.type";
import sendEmail from "../utils/mailer";
import { CustomError } from "../utils/error";
import { nanoid } from "nanoid";

export const createUser = async (
  createUserData: ParamType.User.createUser,
): Promise<string> => {
  // Create user
  const user = await db.createUser({ value: createUserData });

  // Send email
  await sendEmail({
    from: "test@example.com",
    to: user.email,
    subject: "Please verify your account",
    text: `verification code ${user.verifiedCode}`,
  });

  return "Create user successfully";
};

export const verifyUser = async ({
  id,
  code,
}: ParamType.User.verifyUser): Promise<string> => {
  // Find user
  const user = await db.findById({ id });
  if (!user)
    throw new CustomError("user.error.user_not_found", "User is not found");

  // Check verified status
  if (user.verifiedStatus)
    throw new CustomError("user.error.user_verified", "User is verified");

  // Compare verification code
  if (user.verifiedCode !== code)
    throw new CustomError(
      "user.error.invalid_code",
      "Verification code is invalid, Please check your email",
    );

  // Verified user
  user.verifiedStatus = true;

  await user.save();

  return "Verify user successfully";
};

export const requestForgetPassword = async ({
  email,
}: ParamType.User.requestForgetPassword): Promise<string> => {
  // Find user by email
  const user = await db.findByEmail({ email });
  if (!user)
    throw new CustomError("user.error.user_not_found", "User is not found");

  // Check verified status
  if (!user.verifiedStatus)
    throw new CustomError(
      "user.error.user_not_verified",
      "User is not verified",
    );

  // Generate password reset code
  const passwordResetCode = nanoid();
  user.passwordResetCode = passwordResetCode;

  // Sending mail, save password
  await Promise.all([
    sendEmail({
      from: "test@example.com",
      to: user.email,
      subject: "Reset your password",
      text: `password reset code ${user.passwordResetCode}`,
    }),
    user.save(),
  ]);

  return "Request password reset successfully";
};

export const confirmForgetPassword = async ({
  email,
  password,
  passwordResetCode,
}: ParamType.User.confirmForgetPassword): Promise<string> => {
  // Find user by email
  const user = await db.findByEmail({ email });
  if (!user)
    throw new CustomError("user.error.user_not_found", "User is not found");

  // Check verified status
  if (!user.verifiedStatus)
    throw new CustomError(
      "user.error.user_not_verified",
      "User is not verified",
    );

  // Check password reset code
  if (!user.passwordResetCode || passwordResetCode !== user.passwordResetCode)
    throw new CustomError(
      "user.error.invalid_password_reset_code",
      "Password reset code is invalid, Request for your password reset code",
    );

  // Save new password, reset password reset code
  user.password = password;
  user.passwordResetCode = null;
  await user.save();

  return "Confirm password reset successfully";
};
