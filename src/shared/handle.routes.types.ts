import { Response } from 'express';

export interface IHandle {
    handleSucces: (res: Response) => (result: any) => void;
    handleError: (res: Response) => (result: any) => void;
}
