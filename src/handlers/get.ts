import { Handler } from '../types';


// /get?k=v&k2=1
export const gethandler: Handler = (req, res) => {
  res.json({
    headers: req.headers,
    query: req.query,      //{k:"v",k2:"1"}   
    params: req.params,      
    body: req.body          //should always be {} for get?
  });
};