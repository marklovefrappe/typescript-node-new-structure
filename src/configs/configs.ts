import dotenv from "dotenv";

dotenv.config();

const configs = {
  port: Number(process.env.SERVER_PORT) || 3000,
  server: process.env.SERVER_HOSTNAME || "localhost",
  mongoUrl: process.env.MONGODB_URL || "mongodburl",
  logLevel: process.env.LOG_LEVEL || "info",
  smtp: {
    user: "oa6d2jbuph4jdplw@ethereal.email",
    pass: "gQ6jwEh4ws1bH3KYj2",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
};

export default configs;
