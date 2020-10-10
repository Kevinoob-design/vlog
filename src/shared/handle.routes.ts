import { Response } from 'express';
import { IHandle } from './handle.routes.types';

export default class RoutesHandler implements IHandle {

    public handleSucces = (res: Response) => {
        return (payload: any) => {
            res.json(payload);
        };
    }

    public handleError = (res: Response) => {
        return (payload: any) => {
            if (!payload.msg) payload.msg = 'There was an issue with your request';
            res.json(payload);
        };
    }
}
