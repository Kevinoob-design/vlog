import { Response } from 'express';
import { IHandle } from './handle.routes.d';

export default class RoutesHandler implements IHandle {
  public handleSuccess = (res: Response, statusCode: number) => {
    return (payload: any) => {
      if (payload.bearer) res.setHeader('Bearer', payload.bearer.toString());

      res.status(statusCode).json(payload);
    };
  };

  public handleError = (res: Response, statusCode: number) => {
    return (payload: any) => {
      if (!payload.msg) payload.msg = 'There was an issue with your request';
      res.status(statusCode).json(payload);
    };
  };
}
