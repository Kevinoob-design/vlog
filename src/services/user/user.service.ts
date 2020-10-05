import { Request, Response, Application } from "express";
import { Mongoose } from "mongoose";

module.exports = (prefix: string, app: Application, db: Mongoose) => {
  app.get(`${prefix}/signin`, (req: Request, res: Response) => {
    return res.status(200).json({ worked: "it fucking worked!!" });
  });
};
