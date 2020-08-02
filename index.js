const express = require('express');
const fizzbuzzRouter = require('./src/routes/fizzbuzz.routes');
const errorHandlerMiddleware = require('./src/middlewares/error.handler.middleware');
const corsHandlerMiddleware = require('./src/middlewares/cors.handler.middleware');
const correlationIdHandlerMiddleware = require('./src/middlewares/correlation.handler.middleware');

const contextPath = '/fizzbuzz-api-v1';

const app = express();
app.use(correlationIdHandlerMiddleware);
app.use(corsHandlerMiddleware());
app.use(express.json());
app.use(`${contextPath}/fizzbuzz/print-pattern`, fizzbuzzRouter);

app.get(`${contextPath}/heartbeat`, (req, res) => {
    res.json({ message: `Fizzbuzz API is up and running!` });
});

app.use(errorHandlerMiddleware);

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
if (isInLambda) {
    const serverlessExpress = require('aws-serverless-express');
    const server = serverlessExpress.createServer(app);
    exports.handler = (event, context) => serverlessExpress.proxy(server, event, context);
} else {
    app.listen(3000, () => console.log(`Listening on 3000: http://localhost:3000${contextPath}`));
}

module.exports = app;
