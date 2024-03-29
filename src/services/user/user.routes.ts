import User from './user.controller';

import { Request, Response, Application } from 'express';
import { IHandle } from 'src/shared/routes/handle.routes.d';

module.exports = (prefix: string, app: Application, handler: IHandle) => {
  const user = new User();

  app.post(`${prefix}/singup`, (req: Request, res: Response) => {
    user.singUpUserWithFB(req.body).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/login`, (req: Request, res: Response) => {
    user.logInUserWithFB(req.body).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/access/update/social`, (req: Request, res: Response) => {
    user.addSocialMedia(req.body, req.uid).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/access/update/phone`, (req: Request, res: Response) => {
    user.addRecoveryPhone(req.body.telephone, req.uid).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });

  app.get(`${prefix}/access/get`, (req: Request, res: Response) => {
    user.getUserByID(req.uid).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/access/reset/password`, (req: Request, res: Response) => {
    user.recoverPassword(req.fbUser).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/access/verify/email`, (req: Request, res: Response) => {
    user.sendVerifyEmail(req.fbUser).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });

  app.delete(`${prefix}/access/delete`, (req: Request, res: Response) => {
    user.disableUserByID(req.uid, req.token).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });
};
