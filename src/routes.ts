import { home } from './handlers/home';
import { gethandler } from './handlers/get';
import { posthandler } from './handlers/post';
import { forwarder } from './handlers/forwarder';
import {oauth_github_auth, oauth_github_callback} from './handlers/oauth_github';
import {oauth_dingtalk_auth, oauth_dingtalk_callback, oauth_dingtalk_token, oauth_dingtalk_profile} from './handlers/oauth_dingtalk';

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
  },
  {
    method: 'get',
    path: '/oauth_github/auth',   //auth url, will forward to github for auth, but modify the callback url
    middleware: [],
    handler: oauth_github_auth,
  },
  {
    method: 'get',
    path: '/oauth_github/callback',   //callback url, will callback oauth client
    middleware: [],
    handler: oauth_github_callback,
  },
  {
    method: 'get',
    path: '/oauth_dingtalk/auth',   //auth url, will forward to github for auth, but modify the callback url
    middleware: [],
    handler: oauth_dingtalk_auth,
  },
  {
    method: 'get',
    path: '/oauth_dingtalk/callback',   //callback url, will callback oauth client
    middleware: [],
    handler: oauth_dingtalk_callback,
  },
  {
    method: 'post',
    path: '/oauth_dingtalk/access_token',   //callback url, will callback oauth client
    middleware: [],
    handler: oauth_dingtalk_token,
  },
  {
    method: 'get',
    path: '/oauth_dingtalk/profile',   //callback url, will callback oauth client
    middleware: [],
    handler: oauth_dingtalk_profile,
  }
];


///oauth_dingtalk/profile

