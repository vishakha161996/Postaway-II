import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {service: 'request-logging'},
    transports: [ new winston.transports.File({filename: 'combined.log'})],
  });

  
  export const loggerMiddleware = async (req, res, next) => {
    // Write your code here
    const logData = {
        timestamp: new Date(),
        method: req.method,
        url: req.url,
        requestBody: req.body,
        queryParameters: req.query,
    };

    const formattedLogData = JSON.stringify(logData, null, 2); // Adding indentation for readability

    logger.info(formattedLogData);
    next();
  };

  const errorLogger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    defaultMeta: { service: 'error-logging' },
    transports: [new winston.transports.File({ filename: 'error.log'})],
});

export const errorLoggerMiddleware = async (error, req, res, next) => {
    const logData = {
        timestamp: new Date(),
        url: req.url,
        method: req.method,
        error: error.message,
        stack: error.stack
    };
    errorLogger.error(logData);
    next(error);
};

export default { loggerMiddleware, errorLoggerMiddleware };
