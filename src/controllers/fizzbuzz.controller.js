const { generateFizzBuzzPattern } = require('../utils/app.utils');
const logger = require('../config/pino.config');

/**
 * Print Fizzbuzz Pattern Controller Layer
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const printFizzBuzzPattern = async (req, res, next) => {
    try {
        logger.info(`Print Buzz Pattern Request Execution Started at : ${new Date().getTime()}, with correlationId : ${req['x-correlation-id']}`);
        const { count } = req.query;
        const fizzBuzzPatternArray = generateFizzBuzzPattern(count);
        const reponsePayload = {
            fizzBuzzPatternArray,
            fizzBuzzPattern: fizzBuzzPatternArray.toString(),
        }
        logger.info(`Print Buzz Pattern Request Execution Ended at : ${new Date().getTime()}, with correlationId : ${req['x-correlation-id']}`);
        return res.status(200).json(reponsePayload);
    } catch (err) {
        logger.error(err);
        return next({
            code: 500,
            message: 'Internal Server Error: Something went wrong!',
            developerMessage: `Internal Server Error: ${err.message}`,
        });
    }
};

module.exports = {
    printFizzBuzzPattern,
};
