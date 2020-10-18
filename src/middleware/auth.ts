import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase';

export const verifyAuthUser = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) return res.redirect('/');

  const token = req.headers.authorization.split(' ')[1];

  auth()
    .signInWithCustomToken(token)
    .then((resp) => {
      req.uid = resp.user.uid;
      req.token = token;
      req.fbUser = resp.user;
      next();
    })
    .catch((err) => {
      res.redirect('/');
    });
};
