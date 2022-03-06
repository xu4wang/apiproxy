import { Handler } from '../types';
import client,{RequestConfig,ServerResponse} from '../lib/http';
import Logger from "../lib/logger";
const querystring = require('querystring');    


//read parameters, make changes to callback, and redirect to real github auth url
/*
    "params": {
        "client_id": "7ece5cc78e4fdd3260ae",
        "scope": "email",
        "response_type": "code",
        "redirect_uri": "https://d819-240e-47c-30a8-43ad-c896-3c06-3821-7cd7.ngrok.io/auth/login/github/callback",
        "access_type": "offline",
        "code_challenge": "RXQ9Br3PaYLlXl777XxpHBx_9WfGWb9ur8pRta6ne8w",
        "code_challenge_method": "S256",
        "state": "RXQ9Br3PaYLlXl777XxpHBx_9WfGWb9ur8pRta6ne8w"
    }
*/

//save request info 
const db= new Map();

export const oauth_github_auth: Handler = async (req, res) => {
  const auth_url:string = "https://github.com/login/oauth/authorize";
  //params:req.query
  db.set(req.query.state, req.query["redirect_uri"]) 
  req.query.redirect_uri = "https://d819-240e-47c-30a8-43ad-c896-3c06-3821-7cd7.ngrok.io/oauth_github/callback"
  const query = querystring.stringify(req.query);
  const redirect_url:string = `${auth_url}?${query}`
  Logger.info(redirect_url)
  res.redirect(redirect_url);
};

//callback(redirect) to client based on parameter
export const oauth_github_callback: Handler = async (req, res) => {
    const state = req.query.state
    const uri = db.get(state)
    const query = querystring.stringify(req.query);
    res.redirect(`${uri}?${query}`);
};  
