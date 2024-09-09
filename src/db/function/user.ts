import UserModel from "../models/user.model";
import * as Type from "../../types/db.type";

export const createUser = async ({ value }: Type.User.createUser) => {
  const result = await UserModel.create(value);

  return result;
};

export const findById = async ({ id }: Type.User.findById) => {
  const result = await UserModel.findById(id);

  return result;
};

export const findByEmail = async ({ email }: Type.User.findByEmail) => {
  const result = await UserModel.findOne({ email });

  return result;
};
