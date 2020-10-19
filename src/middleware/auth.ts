import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.fbUser) return res.redirect('/');
  next();
};

export const verifyAuthUser = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) return next();

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
      next();
    });
};
