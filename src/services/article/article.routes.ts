import Article from './article.controller';

import { Request, Response, Application } from 'express';
import { IHandle } from 'src/shared/routes/handle.routes.d';

module.exports = (prefix: string, app: Application, handler: IHandle) => {
  const article = new Article();

  app.get(`${prefix}/get-articles`, (req: Request, res: Response) => {
    article.getArticles().then(handler.handleSucces(res, 200)).catch(handler.handleError(res, 400));
  });

  app.get(`${prefix}/get-full-article`, (req: Request, res: Response) => {
    article
      .getFullArticle(req.query.id as string, req.fbUser)
      .then(handler.handleSucces(res, 200))
      .catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/access/create-article`, (req: Request, res: Response) => {
    article.postArticle(req.body, req.fbUser).then(handler.handleSucces(res, 200)).catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/access/like-article`, (req: Request, res: Response) => {
    article
      .likeArticle(req.query.id as string, req.fbUser)
      .then(handler.handleSucces(res, 200))
      .catch(handler.handleError(res, 400));
  });

  app.post(`${prefix}/access/dislike-article`, (req: Request, res: Response) => {
    article
      .dislikeArticle(req.query.id as string, req.fbUser)
      .then(handler.handleSucces(res, 200))
      .catch(handler.handleError(res, 400));
  });
};
