import express from 'express';
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';
import { resolve } from 'path';
import { config } from 'dotenv';

import Logger, { loggerStream }  from "./lib/logger";
import morganMiddleware from "./lib/morganMiddleware";
import { routes } from './routes';

config({ path: resolve(__dirname, '../.env') });

const app = express();

if (process.env.NODE_ENV ===  'development') {
  morganBody(app, {
    logIP: true,
    noColors: true,
    timezone: 'Asia/Shanghai',
    stream: loggerStream,
  });
}

const PORT =  process.env.PORT || 3000;

app.use(morganMiddleware);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach((route) => {
  const { method, path, middleware, handler } = route;
  app[method](path, ...middleware, handler);
});

app.listen(PORT, () => {
  Logger.info(`API Proxy Started, listening port: ${PORT}`);
});