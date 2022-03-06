import { RequestHandler as Middleware } from 'express';
import Logger from "../lib/logger";

export const reqdebugger: Middleware = (req, res, next) => {
  Logger.debug("dumping req.headers");
  console.log(req.headers);
  next();
};