import { Handler } from '../types';
import client,{RequestConfig,ServerResponse} from '../lib/http';

export const forwarder: Handler = async (req, res) => {
  const protocol:string = req.params[0] === 's' ? 'http' : 'https';
  const target:string = `${protocol}://${req.params.site}${req.params[1]}`;

  const cfg:RequestConfig = {
    method: req.method,
    url: target,
    data: req.body,
    params:req.query
  }

  const response:ServerResponse = await client(cfg);
  res.json(
    response.data
  );
};

