import User from './user.controller';

import { Request, Response, Application } from 'express';
import { IHandle } from 'src/shared/routes/handle.routes.types';

module.exports = (prefix: string, app: Application, handler: IHandle) => {

  const user = new User();

  app.post(`${prefix}/singup`, (req: Request, res: Response) => {
    user.singUpUserWithFB(req.body).then(handler.handleSucces(res, 200)).catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/login`, (req: Request, res: Response) => {
    user.logInUserWithFB(req.body).then(handler.handleSucces(res, 200)).catch(handler.handleError(res, 400));
  });

  app.get(`${prefix}/access/get`, (req: Request, res: Response) => {
    user.getUserByID(req.uid).then(handler.handleSucces(res, 200)).catch(handler.handleError(res, 400));
  });

  app.delete(`${prefix}/access/delete`, (req: Request, res: Response) => {
    user.disableUserByID(req.uid, req.token).then(handler.handleSucces(res, 200)).catch(handler.handleError(res, 400));
  });
};
