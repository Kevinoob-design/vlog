import User from './user.controller';

import { Request, Response, Application } from 'express';
import { IHandle } from 'src/shared/handle.routes.types';

module.exports = (prefix: string, app: Application, handler: IHandle) => {

  const user = new User();

  app.get(`${prefix}/login`, (req: Request, res: Response) => {
    user.getUserByID(req.body).then(handler.handleSucces(res, 200)).catch(handler.handleError(res, 400));
  });
};
