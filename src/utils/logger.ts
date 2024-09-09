import pino from "pino";
import dayjs from "dayjs";
import configs from "../configs/configs";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  level: configs.logLevel,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
