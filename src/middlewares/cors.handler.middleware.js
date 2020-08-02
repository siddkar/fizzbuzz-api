const logger = require('../config/pino.config');

const defaultOptions = {
    allowOrigin: '*',
    allowHeader: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key, User-Agent, Referer',
    allowMethods:  'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
};

/**
 * CORS handler middleware - Enables CORS for web based requests
 * 
 * @param {*} options 
 */
const corsHandlerMiddleware = (options = defaultOptions) => (req, res, next) => {
    options = {
        ...defaultOptions,
        ...options,
    };
    logger.info(`CORS Request Options ${JSON.stringify(options, null, 4)}, with correlationId : ${req['x-correlation-id']}`);
    res.header("Access-Control-Allow-Origin", options.allowOrigin );
    res.header("Access-Control-Allow-Headers", options.allowHeader );
    res.header("Access-Control-Allow-Methods", options.allowMethods );
    return next();
};

module.exports = corsHandlerMiddleware;
