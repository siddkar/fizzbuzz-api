const logger = require('../config/pino.config');

/**
 * Error Handler Middleware - Handles any error in the request and return proper error response
 * 
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorHandlerMiddleware = (err, req, res, next) => {
    logger.error(`Error in serving request correlationId : ${req['x-correlation-id']}, Error Message: ${err}`);
    if (err.code) {
        if (err.code === 400) {
            return res.status(400).json({
                code: err.code,
                userMessage: err.userMessage ? err.userMessage : 'Bad Request: Invalid Request',
                developerMessage: err.developerMessage ? err.developerMessage : 'Bad Request: Invalid Request',
                errors: err.errors
            });
        }
        else {
            return res.status(500).json({
                code: 500,
                userMessage: err.userMessage ? err.userMessage : 'Internal Server Error: An unexpected error has occurred. Please contact Technical Support',
                developerMessage: err.developerMessage ? err.developerMessage : 'Internal Server Error: An unexpected error has occurred. Please contact Technical Support'
            });
        }
    }
    return res.status(500).json({
        code: 500,
        userMessage: err.userMessage ? err.userMessage : 'Internal Server Error: An unexpected error has occurred. Please contact Technical Support',
        developerMessage: err.developerMessage ? err.developerMessage : 'Internal Server Error: An unexpected error has occurred. Please contact Technical Support'
    });
};

module.exports = errorHandlerMiddleware;
