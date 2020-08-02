const { v4 } = require('uuid');
const logger = require('../config/pino.config');

/**
 * Correlation ID Middleware - Adds a correlation id to the request to keep a track on the request journey.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const correlationIdHandlerMiddleware = (req, res, next) => {
    const correlationId = v4();
    req['x-correlation-id'] = correlationId;
    res.header('x-correlation-id', correlationId);
    logger.info(`Correlation id for the request : ${req['x-correlation-id']}`);
    return next();
};

module.exports = correlationIdHandlerMiddleware;
