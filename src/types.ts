import { Request, Response, RequestHandler as Middleware } from 'express';

type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch'
  | 'all';  //can we use app["all"] in express ? YES

export type  Handler =  (req: Request, res: Response) => any;

export type Route = {
  method: Method;
  path: string;
  middleware: Middleware[];   // a list of request handlers to be executed before the handler below.
  handler: Handler;
};