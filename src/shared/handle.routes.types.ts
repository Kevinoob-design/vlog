import { Response } from 'express';

export interface IHandle {
    handleSucces: (res: Response, statusCode: number) => (result: any) => void;
    handleError: (res: Response, statusCode: number) => (result: any) => void;
}
