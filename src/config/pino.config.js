const pino = require('pino');

/**
 * Initializing Pino Logger
 */
const logger = pino({
    prettyPrint: true,
    enabled: ! (process.env.NODE_ENV === 'test')
});

module.exports = logger;
