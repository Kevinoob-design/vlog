import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase';

export const verifyAuthUser = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.headers.authorization) res.redirect('/');

    const token = req.headers.authorization.split(' ')[1];

    auth().signInWithCustomToken(token).then(resp => {
        req.uid = resp.user.uid;
        next();
    }).catch(err => {
        res.redirect('/');
    });
};
