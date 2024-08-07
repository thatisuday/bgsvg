import pino from "pino";

const level = process.env.LOG_LEVEL || "trace";

export const logger = pino({
    level,
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
});
