import Comment from './comment.controller';

import { Request, Response, Application } from 'express';
import { IHandle } from 'src/shared/routes/handle.routes.d';

module.exports = (prefix: string, app: Application, handler: IHandle) => {
  const comment = new Comment();

  app.get(`${prefix}/access/create-comment`, (req: Request, res: Response) => {
    comment.createComment(req.body, req.fbUser).then(handler.handleSucces(res, 200)).catch(handler.handleError(res, 400));
  });
};
