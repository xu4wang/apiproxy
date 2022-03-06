import { Handler } from '../types';
import client,{RequestConfig,ServerResponse} from '../lib/http';
import Logger from "../lib/logger";

export const forwarder: Handler = async (req, res) => {
  const protocol:string = req.params[0] === 's' ? 'https' : 'http';
  const target:string = `${protocol}://${req.params.site}${req.params[1]}`;

  const cfg:RequestConfig = {
    method: req.method,
    url: target,
    data: req.body,
    params:req.query
  }

  const response:ServerResponse = await client(cfg);
  for (const k in response.headers) {
    res.setHeader(k,response.headers[k])
  }
  res.send(
    response.data
  );
};

