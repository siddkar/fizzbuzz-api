const Ajv = require('ajv');
const logger = require('../config/pino.config');

const ajv = new Ajv({
    allErrors: true,
    logger: false
});

/**
 * Schema Validation Middleware - Validates the user input request schema, in query and body
 * 
 * @param {*} schema 
 * @param {*} location 
 */
const schemaValidatorMiddleware = (schema, location = 'body') => async (req, res, next) => {
    try {
        logger.info(`Validating request ${location} parameters, for correlationId : ${req['x-correlation-id']}`);
        const instance = location === 'query' ? req.query : req.body;
        const schemaName = location === 'query' ? 'query' : schema.id;
        const isValid = await ajv.validate(schema, instance);
        if (isValid && !ajv.errors) {
            return next();
        }
        const errors = ajv.errors.map(error => {
            let field = `${schemaName}${error.dataPath}`;
            if (error.keyword === 'required') {
                field = `${schemaName}${error.dataPath}`;
            }
            if (error.keyword === 'additionalProperties') {
                field = `${schemaName}${error.dataPath}.${error.params.additionalProperty}`;
            }
            return { field, message: error.message };
        });
        throw {
            code: 400,
            userMessage: 'Bad Request: Invalid Request Body',
            developerMessage: 'Bad Request: Invalid Request Body',
            errors,
        };
    } catch (err) {
        logger.error(err);
        if (err.code) {
            return next(err);
        }
        return next(err);
    }
};

module.exports = schemaValidatorMiddleware;
