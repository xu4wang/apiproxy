//
//copied from https://github.com/vassalloandrea/medium-morgan-winston-example
//added loggerStream for morgan-body use
//

import winston from 'winston'
import { StreamLikeType } from 'morgan-body';
import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../../.env') });

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  console.log(`process.env.NODE_ENV : ${process.env.NODE_ENV}` )
  const isDevelopment = env === 'development'
  console.log(`Running at Developemnt? ${isDevelopment} `)
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export const loggerStream: StreamLikeType = {
  write: (msg: string): boolean => {
    Logger.info(msg.substring(0, msg.lastIndexOf('\n')));
    return true;
  }
};

export default Logger
