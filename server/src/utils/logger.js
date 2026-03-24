import pino from "pino";
import { NODE_ENV } from "../config/env.js";
const isDev = NODE_ENV === "development";
const logger = pino({
  level: isDev ? "debug" : "info",
  transport: isDev
    ? {
        target: "pino-pretty",
        options: { colorize: true },
      }
    : undefined,
});

export default logger;