import { Handler } from '../types';
import client,{RequestConfig,ServerResponse} from '../lib/http';
import Logger from "../lib/logger";
import db from "../lib/kvstore"

const querystring = require('querystring');    

export const oauth_dingtalk_auth: Handler = async (req, res) => {
  const auth_url:string = "https://login.dingtalk.com/oauth2/auth";
  //params:req.query
  db.set(req.query.state, req.query["redirect_uri"]) 
  const base_url = process.env.PUBLIC_URL || 'http://localhost:3001/'

  /*
redirect_uri=https%3A%2F%2Fwww.aaaaa.com%2Fauth
&response_type=code
&client_id=dingxxxxxxx   //应用的AppKey 
&scope=openid   //此处的openId保持不变
&state=dddd
&prompt=consent
  */
  const query = querystring.stringify({
    redirect_uri:`${base_url}oauth_dingtalk/callback` ,
    response_type:'code',
    scope: 'openid',
    client_id: req.query.client_id,
    state: req.query.state,
    prompt:'consent'
  });
  const redirect_url:string = `${auth_url}?${query}`;
  Logger.debug(redirect_url)
  res.redirect(redirect_url);
};

//callback(redirect) to client based on parameter
export const oauth_dingtalk_callback: Handler = async (req, res) => {
    //console.log(req)

    const state = req.query.state;
    Logger.debug("checking db");
    Logger.debug(db.get(state));
    const uri = db.get(state);
    db.delete(state);
    const query = querystring.stringify({
      code: req.query["authCode"],
      state: req.query["state"]
    });
    const redirect_url:string = `${uri}?${query}`;
    Logger.debug(redirect_url);
    res.redirect(redirect_url);
};  

/* for GitHub

post 

  body: {
    grant_type: 'authorization_code',
    code: '20877ea13c6935fa8b43d4ff6fe2f9ff',
    redirect_uri: 'http://localhost:8056/auth/login/dingtalk/callback',
    code_verifier: 'mTSwR9i8QcvaAjI0W3HcWZwHSqrHkKiKLFT-dz_AWTU'
  }

==>

json body : access_token=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&scope=&token_type=bearer

*/

/* for Dingtalk

POST https://api.dingtalk.com/v1.0/oauth2/userAccessToken 
Content-Type:application/json

{
  "clientId" : "ding your id",
  "clientSecret" : "your secret",
  "code" : "6b427e8bfab83e93bedd13f16a430702",
  "grantType" : "authorization_code"
}

==>

{
  "expireIn": 7200,
  "accessToken": "a8f4e3215a703ce9a7164e91dbab53c0",
  "refreshToken": "b13e5a61b421342d95d86c9e64c275c6"
}
*/

export const oauth_dingtalk_token: Handler = async (req, res) => {
    const token_url:string = "https://api.dingtalk.com/v1.0/oauth2/userAccessToken";
    //console.log(req)
    const client_id = process.env.DINGTALK_CLIENT_ID || 'NEED SET CLIENT ID'
    const client_secret = process.env.DINGTALK_CLIENT_SECRET || 'NEED SET CLIENT SECRET'

    const rq = {
      clientId: client_id,
      clientSecret: client_secret,
      code: req.body.code,
      grantType: "authorization_code"
    }

    const cfg:RequestConfig = {
        method: "POST",
        url: token_url,
        data: rq,
        params:{}
    }
    
    const response:ServerResponse = await client(cfg);
    //Logger.debug(response.data.accessToken)
    res.json({
      access_token:response.data.accessToken,     //we ignore refresh_token, 7200 seconds is long enough.
      scope:"",
      token_type:"bearer"
    });
};  

/*
GET https://api.dingtalk.com/v1.0/contact/users/me 
x-acs-dingtalk-access-token:a8f4e3215a703ce9a7164e91dbab53c0
Content-Type:application/json
*/

export const oauth_dingtalk_profile: Handler = async (req, res) => {
  const info_url:string = "https://api.dingtalk.com/v1.0/contact/users/me";
  //console.log(req.headers)

  const cfg:RequestConfig = {
      method: "GET",
      url: info_url,
      data: {},
      params:{},
      headers:{"x-acs-dingtalk-access-token":req.headers.authorization?.substring(7)}
  }
  
  const response:ServerResponse = await client(cfg);
  res.json({
    email:response.data["email"]
  });
};  
