import mongoose from "mongoose";
import configs from "../configs/configs";
import log from "./logger";
import logger from "./logger";

export default async () => {
  try {
    await mongoose.connect(configs.mongoUrl);
    log.info("MongoDB is connected");
  } catch (error) {
    logger.error(error);
  }
};
