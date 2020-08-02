const Router = require('express').Router;
const {
    printFizzBuzzPattern
} = require('../controllers/fizzbuzz.controller');
const schemaValidatorMiddleware = require('../middlewares/schema.validator.middleware');
const fizzbuzzQueryParamValidatorSchema = require('../schemas/fizzbuzz.query.schema.json');

const fizzbuzzRouter = new Router();

/**
 * Fizzbuzz /GET print-pattern route
 */
fizzbuzzRouter.get('/',
    schemaValidatorMiddleware(fizzbuzzQueryParamValidatorSchema, 'query'),
    printFizzBuzzPattern,
);

module.exports = fizzbuzzRouter;
