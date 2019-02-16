const {
  format,
  createLogger,
  transports,
  addColors,
  config
} = require("winston");
const { inspect } = require("util");

module.exports = () => {
  const levels = {
    ...config.npm.levels,
    gql: 4
  };

  const colors = {
    ...config.npm.colors,
    gql: "bold magenta"
  };

  const fmt = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(info => {
      const { timestamp, level, message } = info;

      const ts = timestamp.slice(0, 19).replace("T", " ");

      return `${ts} [${level}]: ${message})`;
    })
  );

  const logger = createLogger({
    levels,
    level: "info",
    transports: [
      new transports.File({
        colors,
        levels,
        format: fmt,
        filename: "logs/error.log",
        level: "error"
      }),
      new transports.File({
        colors,
        levels,
        format: fmt,
        filename: "logs/combined.log"
      })
    ]
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new transports.Console({
        colors,
        levels,
        format: fmt,
        level: "silly"
      })
    );
  }

  addColors(colors);

  logger.deep = (msg) => inspect(msg, false, null);

  return logger;
};
