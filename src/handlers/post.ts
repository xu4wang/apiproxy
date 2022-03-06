import { Handler } from '../types';

export const posthandler: Handler = (req, res) => {
  res.json({
    query: req.query,
    body: req.body,
    headers: req.headers,
    params: req.params
  });
};