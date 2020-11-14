import Category from './category.controller';

import { Request, Response, Application } from 'express';
import { IHandle } from 'src/shared/routes/handle.routes.d';

module.exports = (prefix: string, app: Application, handler: IHandle) => {
  const category = new Category();

  app.post(`${prefix}/singup`, (req: Request, res: Response) => {
    category.createNewCategory(req.body, req.fbUser).then(handler.handleSuccess(res, 200)).catch(handler.handleError(res, 400));
  });
};
