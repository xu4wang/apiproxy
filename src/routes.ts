import { home } from './handlers/home';
import { gethandler } from './handlers/get';
import { posthandler } from './handlers/post';
import { forwarder } from './handlers/forwarder';

import { reqdebugger } from './middleware/reqdebugger';
import { Route } from './types';

export const routes: Route[] = [
  {
    method: 'get',
    path: '/',            //hello world
    middleware: [],
    handler: home,
  },
  {
    method: 'get',
    path: '/get',           //for test GET 
    middleware: [],
    handler: gethandler,
  },
  {
    method: 'post',
    path: '/post',            //for test POST 
    middleware: [reqdebugger],
    handler: posthandler,
  },
  {
    method: 'all',
    path: '/http(s?)/:site*',   //forward API call to site with same parameters
    middleware: [],
    handler: forwarder,
  }
];