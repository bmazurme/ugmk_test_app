/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const index = require('./routes/products-route');
const limiter = require('./utils/limiter');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');
const { errorLogger } = require('./middlewares/logger');
const corsOptions = require('./utils/cors-options');

const { PORT = 3001 } = process.env;

const app = express();

app.use('*', cors(corsOptions));
app.use(limiter);
app.use(helmet());

app.use('/', index);

app.use('*', () => {
  throw new NotFoundError('Not found page');
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
