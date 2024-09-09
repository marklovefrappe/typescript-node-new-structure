import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import argon2 from "argon2";
import { nanoid } from "nanoid";
import logger from "../../utils/logger";

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await argon2.hash(this.password);
  this.password = hash;

  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verifiedCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ required: true, default: false })
  verifiedStatus: boolean;

  async validatePassword(this: DocumentType<User>, inputPassword: string) {
    try {
      return await argon2.verify(this.password, inputPassword);
    } catch (error) {
      logger.error(error, "Validate password fail");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
