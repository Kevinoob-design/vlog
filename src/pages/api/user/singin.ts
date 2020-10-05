import {Request, Response} from 'express';

export default (req: Request, res: Response) => {
  res.statusCode = 200
  res.json({ email: req.body.email, password: req.body.password });
}