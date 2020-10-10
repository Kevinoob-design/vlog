import User from './user.controller';

import { Request, Response, Application } from 'express';
import { IHandle } from 'src/shared/handle.routes.types';

module.exports = (prefix: string, app: Application, handler: IHandle) => {

  const user = new User();

  app.get(`${prefix}/signin`, (req: Request, res: Response) => {
    user.getUserByID(req.body._id).then(handler.handleSucces(res)).catch(handler.handleError(res));
  });
};
